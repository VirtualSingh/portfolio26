import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import type { ElementRef } from '@angular/core';
import { PORTFOLIO } from '../../core/content/portfolio.config';
import { ScrollRevealDirective } from '../../shared/components/scroll-reveal/scroll-reveal.directive';
import { SectionAnchorDirective } from '../../shared/components/section-anchor/section-anchor.directive';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { TechBadgeComponent } from '../../shared/components/tech-badge/tech-badge.component';

/** How long each project holds the stage before the carousel drifts on. */
const AUTO_ADVANCE_MS = 5000;

@Component({
  selector: 'app-projects',
  imports: [
    ScrollRevealDirective,
    SectionAnchorDirective,
    SectionHeaderComponent,
    TechBadgeComponent,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  readonly content = PORTFOLIO.projects;

  /** Index of the slide nearest the viewport's left snap edge. */
  readonly active = signal(0);

  /** Auto-advance pauses while hovered and stops for good once the visitor
   *  drives (swipe, arrow, dot, or keyboard focus) — their intent wins. */
  hovering = false;
  private autoTimer: ReturnType<typeof setInterval> | undefined;
  private autoStopped = false;
  private inView = false;
  private scrollRaf = 0;

  private readonly viewport = viewChild.required<ElementRef<HTMLElement>>('viewport');
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      // Motion nobody asked for is motion someone turned off
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }
      const io = new IntersectionObserver(
        ([entry]) => {
          this.inView = entry.isIntersecting;
        },
        { threshold: 0.4 },
      );
      io.observe(this.viewport().nativeElement);
      this.autoTimer = setInterval(() => this.autoAdvance(), AUTO_ADVANCE_MS);
      this.destroyRef.onDestroy(() => {
        io.disconnect();
        this.clearAuto();
        cancelAnimationFrame(this.scrollRaf);
      });
    });
  }

  /** Track which card is snapped as the visitor (or the timer) scrolls. */
  onScroll(): void {
    cancelAnimationFrame(this.scrollRaf);
    this.scrollRaf = requestAnimationFrame(() => {
      const el = this.viewport().nativeElement;
      const cards = el.querySelectorAll<HTMLElement>('.projects__card');
      let nearest = 0;
      let nearestDist = Infinity;
      cards.forEach((card, i) => {
        const dist = Math.abs(card.offsetLeft - el.scrollLeft);
        if (dist < nearestDist) {
          nearestDist = dist;
          nearest = i;
        }
      });
      this.active.set(nearest);
    });
  }

  /** Dot/arrow navigation. `byUser` retires the auto-advance permanently. */
  goTo(index: number, byUser: boolean): void {
    if (byUser) {
      this.stopAuto();
    }
    const el = this.viewport().nativeElement;
    const card = el.querySelectorAll<HTMLElement>('.projects__card')[index];
    if (!card) {
      return;
    }
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollTo({ left: card.offsetLeft, behavior: smooth ? 'smooth' : 'auto' });
  }

  step(direction: -1 | 1): void {
    const next = Math.min(
      Math.max(this.active() + direction, 0),
      this.content.items.length - 1,
    );
    this.goTo(next, true);
  }

  stopAuto(): void {
    this.autoStopped = true;
    this.clearAuto();
  }

  private autoAdvance(): void {
    if (this.autoStopped || this.hovering || !this.inView || document.hidden) {
      return;
    }
    const next = (this.active() + 1) % this.content.items.length;
    this.goTo(next, false);
  }

  private clearAuto(): void {
    if (this.autoTimer !== undefined) {
      clearInterval(this.autoTimer);
      this.autoTimer = undefined;
    }
  }
}
