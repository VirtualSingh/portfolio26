import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, PLATFORM_ID, Renderer2, inject, input } from '@angular/core';
import type { OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  host: {
    class: 'scroll-reveal',
  },
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;

  readonly revealDelay = input(0);

  ngOnInit(): void {
    this.renderer.setStyle(this.elementRef.nativeElement, '--reveal-delay', `${this.revealDelay()}ms`);

    if (!isPlatformBrowser(this.platformId)) {
      this.renderer.addClass(this.elementRef.nativeElement, 'is-visible');
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.renderer.addClass(this.elementRef.nativeElement, 'is-visible');
            this.observer?.disconnect();
          }
        });
      },
      {
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.2,
      },
    );

    this.observer.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}