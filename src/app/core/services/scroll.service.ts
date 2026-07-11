import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, NgZone, PLATFORM_ID, inject, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  private readonly document = inject(DOCUMENT);
  private readonly zone = inject(NgZone);
  private readonly platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;

  readonly activeSection = signal('hero');

  registerSection(element: HTMLElement, id: string): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    element.dataset['section'] = id;

    if (!this.observer) {
      this.createObserver();
    }

    this.observer?.observe(element);
  }

  unregisterSection(element: HTMLElement): void {
    this.observer?.unobserve(element);
  }

  scrollToSection(id: string): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  private createObserver(): void {
    this.zone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          const visibleEntries = entries
            .filter((entry) => entry.isIntersecting)
            .sort((first, second) => second.intersectionRatio - first.intersectionRatio);

          const nextId = visibleEntries.at(0)?.target.getAttribute('data-section');
          if (nextId) {
            this.zone.run(() => this.activeSection.set(nextId));
          }
        },
        {
          rootMargin: '-35% 0px -45% 0px',
          threshold: [0.2, 0.4, 0.65],
        },
      );
    });
  }
}