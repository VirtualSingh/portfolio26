import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, PLATFORM_ID, ViewChild, inject, signal } from '@angular/core';
import type { ElementRef, OnDestroy } from '@angular/core';
import { ABOUT_BIO, ABOUT_STATS } from '../../core/content/portfolio.content';
import { ScrollService } from '../../core/services/scroll.service';
import { ScrollRevealDirective } from '../../shared/components/scroll-reveal/scroll-reveal.directive';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';

@Component({
  selector: 'app-about',
  imports: [ScrollRevealDirective, SectionHeaderComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent implements OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly scrollService = inject(ScrollService);
  private observer?: IntersectionObserver;
  private animationFrameId?: number;

  @ViewChild('sectionRef', { static: true }) sectionRef!: ElementRef<HTMLElement>;

  readonly bio = ABOUT_BIO;
  readonly stats = ABOUT_STATS;
  readonly displayedStats = signal<number[]>(ABOUT_STATS.map(() => 0));

  constructor() {
    queueMicrotask(() => this.initObservers());
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.scrollService.unregisterSection(this.sectionRef.nativeElement);
  }

  private initObservers(): void {
    this.scrollService.registerSection(this.sectionRef.nativeElement, 'about');

    if (!isPlatformBrowser(this.platformId)) {
      this.displayedStats.set(this.stats.map((stat) => stat.value));
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          this.startCounterAnimation();
          this.observer?.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    this.observer.observe(this.sectionRef.nativeElement);
  }

  private startCounterAnimation(): void {
    const startTime = performance.now();
    const duration = 1200;

    const animateFrame = (timestamp: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      this.displayedStats.set(this.stats.map((stat) => Math.round(stat.value * progress)));

      if (progress < 1) {
        this.animationFrameId = requestAnimationFrame(animateFrame);
      }
    };

    this.animationFrameId = requestAnimationFrame(animateFrame);
  }
}