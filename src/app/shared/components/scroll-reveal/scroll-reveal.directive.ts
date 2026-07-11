import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, PLATFORM_ID, Renderer2, RendererStyleFlags2, inject, input } from '@angular/core';
import type { OnDestroy, OnInit } from '@angular/core';

/**
 * Reveal-on-scroll that never gates content: elements are visible by default,
 * and the hidden pre-state is armed only for below-fold elements right before
 * observing. Print, SSR, no-JS, and IntersectionObserver failures all render
 * fully visible content.
 */
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
  private frameId?: number;

  readonly revealDelay = input(0);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.renderer.setStyle(this.elementRef.nativeElement, '--reveal-delay', `${this.revealDelay()}ms`, RendererStyleFlags2.DashCase);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    this.frameId = window.requestAnimationFrame(() => {
      const element = this.elementRef.nativeElement;
      const rect = element.getBoundingClientRect();

      // Already at or near the viewport: leave it visible, no animation.
      if (rect.top < window.innerHeight * 0.88) {
        return;
      }

      this.renderer.addClass(element, 'scroll-reveal--armed');

      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.renderer.addClass(element, 'is-visible');
              this.observer?.disconnect();
            }
          });
        },
        {
          rootMargin: '0px 0px -12% 0px',
          threshold: 0.2,
        },
      );

      this.observer.observe(element);
    });
  }

  ngOnDestroy(): void {
    if (this.frameId !== undefined) {
      window.cancelAnimationFrame(this.frameId);
    }

    this.observer?.disconnect();
  }
}
