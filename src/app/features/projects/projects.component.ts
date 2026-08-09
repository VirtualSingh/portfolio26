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

/** How long each stop holds the stage before the carousel drifts on. */
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

  /** Reachable scroll stops, not card indexes: with ~3 cards visible the strip
   *  runs out of track before the last cards can lead, so stepping by card
   *  index strands the arrows. Stops are card snap offsets clamped to the max
   *  scroll and deduped — ~3 on desktop, one per card on phones. Recomputed on
   *  resize. Empty means "everything fits, hide the controls". */
  readonly stops = signal<readonly number[]>([]);
  /** Index of the stop nearest the current scroll position. */
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
      this.computeStops();
      const resizeObserver = new ResizeObserver(() => this.computeStops());
      resizeObserver.observe(this.viewport().nativeElement);
      this.destroyRef.onDestroy(() => {
        resizeObserver.disconnect();
        this.clearAuto();
        cancelAnimationFrame(this.scrollRaf);
      });

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
      this.destroyRef.onDestroy(() => io.disconnect());
    });
  }

  /** Track the nearest stop as the visitor (or the timer) scrolls. */
  onScroll(): void {
    cancelAnimationFrame(this.scrollRaf);
    this.scrollRaf = requestAnimationFrame(() => {
      const el = this.viewport().nativeElement;
      let nearest = 0;
      let nearestDist = Infinity;
      this.stops().forEach((stop, i) => {
        const dist = Math.abs(stop - el.scrollLeft);
        if (dist < nearestDist) {
          nearestDist = dist;
          nearest = i;
        }
      });
      this.active.set(nearest);
    });
  }

  /** Dot/arrow navigation. `byUser` retires the auto-advance permanently. */
  goTo(stopIndex: number, byUser: boolean): void {
    if (byUser) {
      this.stopAuto();
    }
    const left = this.stops()[stopIndex];
    if (left === undefined) {
      return;
    }
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.viewport().nativeElement.scrollTo({ left, behavior: smooth ? 'smooth' : 'auto' });
  }

  step(direction: -1 | 1): void {
    const next = Math.min(Math.max(this.active() + direction, 0), this.stops().length - 1);
    this.goTo(next, true);
  }

  stopAuto(): void {
    this.autoStopped = true;
    this.clearAuto();
  }

  private computeStops(): void {
    const el = this.viewport().nativeElement;
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 4) {
      this.stops.set([]);
      return;
    }
    const cards = [...el.querySelectorAll<HTMLElement>('.projects__card')];
    const first = cards[0]?.offsetLeft ?? 0;
    const stops: number[] = [];
    for (const card of cards) {
      // Snap offset relative to the first card, clamped to the end of the track
      const pos = Math.min(card.offsetLeft - first, max);
      if (stops.length === 0 || pos - stops[stops.length - 1] > 40) {
        stops.push(pos);
      }
    }
    this.stops.set(stops);
    this.onScroll();
  }

  private autoAdvance(): void {
    if (this.autoStopped || this.hovering || !this.inView || document.hidden) {
      return;
    }
    const count = this.stops().length;
    if (count < 2) {
      return;
    }
    this.goTo((this.active() + 1) % count, false);
  }

  private clearAuto(): void {
    if (this.autoTimer !== undefined) {
      clearInterval(this.autoTimer);
      this.autoTimer = undefined;
    }
  }
}
