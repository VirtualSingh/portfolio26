import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { PORTFOLIO } from '../../core/content/portfolio.config';
import type { JourneyEntry } from '../../core/content/portfolio.config';
import { ScrollRevealDirective } from '../../shared/components/scroll-reveal/scroll-reveal.directive';
import { SectionAnchorDirective } from '../../shared/components/section-anchor/section-anchor.directive';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { TechBadgeComponent } from '../../shared/components/tech-badge/tech-badge.component';

/** One mountain in the Journey range scene. */
interface RangePeak {
  entry: JourneyEntry;
  year: string;
  label: string;
  /** Marker position as percentages of the stage box. */
  leftPct: number;
  peakPct: number;
  silhouette: string;
  contours: string[];
}

const VIEW_W = 1200;
const VIEW_H = 400;
const MIN_HEIGHT = 95;
const MAX_HEIGHT = 330;

/** Deterministic jitter so ridgelines look hand-drawn but never shift between renders. */
function jitter(seed: number, amplitude: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return (x - Math.floor(x)) * amplitude * 2 - amplitude;
}

function ridgePoints(cx: number, half: number, height: number, seed: number): [number, number][] {
  const b = VIEW_H;
  return [
    [cx - half, b],
    [cx - half * 0.58, b - height * 0.38 + jitter(seed + 1, height * 0.05)],
    [cx - half * 0.3, b - height * 0.62 + jitter(seed + 2, height * 0.06)],
    [cx - half * 0.12, b - height * 0.88],
    [cx, b - height],
    [cx + half * 0.14, b - height * 0.8 + jitter(seed + 3, height * 0.05)],
    [cx + half * 0.34, b - height * 0.55 + jitter(seed + 4, height * 0.06)],
    [cx + half * 0.62, b - height * 0.3],
    [cx + half, b],
  ];
}

function toPath(points: [number, number][], close: boolean): string {
  const path = points
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(' ');
  return close ? `${path} Z` : path;
}

/** Shrink a silhouette toward its base center — the inner contour echo lines. */
function scaleToward(points: [number, number][], cx: number, factor: number): [number, number][] {
  return points.map(([x, y]) => [cx + (x - cx) * factor, VIEW_H - (VIEW_H - y) * factor]);
}

@Component({
  selector: 'app-journey',
  imports: [
    ScrollRevealDirective,
    SectionAnchorDirective,
    SectionHeaderComponent,
    TechBadgeComponent,
  ],
  templateUrl: './journey.component.html',
  styleUrl: './journey.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JourneyComponent {
  readonly content = PORTFOLIO.journey;

  /** Config lists newest first; the range climbs chronologically toward it, left to right. */
  readonly peaks: RangePeak[] = [...PORTFOLIO.journey.entries].reverse().map((entry, i, all) => {
    const n = all.length;
    const cx = ((i + 0.5) / n) * VIEW_W;
    const height =
      MIN_HEIGHT + (n === 1 ? MAX_HEIGHT - MIN_HEIGHT : (i / (n - 1)) * (MAX_HEIGHT - MIN_HEIGHT));
    const half = (VIEW_W / n) * 1.35;
    const points = ridgePoints(cx, half, height, i * 17 + 3);
    const leftPct = (cx / VIEW_W) * 100;

    return {
      entry,
      year: /\d{4}/.exec(entry.dateRange)?.[0] ?? '',
      label: entry.peakLabel ?? entry.place,
      leftPct,
      peakPct: (height / VIEW_H) * 100,
      silhouette: toPath(points, true),
      contours: [0.66, 0.4].map((factor) => toPath(scaleToward(points, cx, factor), false)),
    };
  });

  /** The tallest, most recent peak starts selected. */
  readonly selected = signal(this.peaks.length - 1);

  select(index: number): void {
    this.selected.set(index);
  }
}
