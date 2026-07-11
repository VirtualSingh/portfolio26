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
      // A section is "active" while it overlaps a thin band around the viewport's
      // middle. threshold: 0 keeps this working for sections taller than the
      // viewport, whose intersection *ratio* with the band can never grow large.
      this.observer = new IntersectionObserver(
        (entries) => {
          const nextId = entries
            .filter((entry) => entry.isIntersecting)
            .sort(
              (first, second) =>
                second.intersectionRect.height - first.intersectionRect.height,
            )
            .at(0)
            ?.target.getAttribute('data-section');

          if (nextId) {
            this.zone.run(() => this.activeSection.set(nextId));
          }
        },
        {
          rootMargin: '-42% 0px -42% 0px',
          threshold: 0,
        },
      );
    });
  }
}