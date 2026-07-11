import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { PORTFOLIO } from '../../core/content/portfolio.config';
import type { JourneyEntry } from '../../core/content/portfolio.config';
import { ScrollRevealDirective } from '../../shared/components/scroll-reveal/scroll-reveal.directive';
import { SectionAnchorDirective } from '../../shared/components/section-anchor/section-anchor.directive';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { TechBadgeComponent } from '../../shared/components/tech-badge/tech-badge.component';

/** One topographic striation line inside a mountain. */
interface RangeContour {
  d: string;
  opacity: number;
}

/** One mountain in the Journey range scene. */
interface RangePeak {
  entry: JourneyEntry;
  year: string;
  label: string;
  /** Marker position as percentages of the stage box. */
  leftPct: number;
  peakPct: number;
  silhouette: string;
  contours: RangeContour[];
}

const VIEW_W = 1200;
const VIEW_H = 400;
const MIN_HEIGHT = 95;
const MAX_HEIGHT = 330;

/** Deterministic LCG so every ridge and striation is stable across renders. */
function seededRandom(seed: number): () => number {
  let state = (seed * 7919 + 104729) % 233280;
  return () => {
    state = (state * 9301 + 49297) % 233280;
    return state / 233280;
  };
}

function toRidgePath(points: [number, number][], close: boolean): string {
  const path = points
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(' ');
  return close ? `${path} Z` : path;
}

/** Quadratic smoothing through midpoints — the flowing hand-drawn striation look. */
function toFlowPath(points: [number, number][]): string {
  if (points.length < 3) {
    return toRidgePath(points, false);
  }
  let d = `M${points[0][0].toFixed(1)} ${points[0][1].toFixed(1)}`;
  for (let i = 1; i < points.length - 1; i++) {
    const midX = (points[i][0] + points[i + 1][0]) / 2;
    const midY = (points[i][1] + points[i + 1][1]) / 2;
    d += ` Q${points[i][0].toFixed(1)} ${points[i][1].toFixed(1)} ${midX.toFixed(1)} ${midY.toFixed(1)}`;
  }
  const [lastX, lastY] = points[points.length - 1];
  return `${d} L${lastX.toFixed(1)} ${lastY.toFixed(1)}`;
}

/** A jagged, asymmetric silhouette: offset summit, uneven flanks, occasional sub-peak. */
function buildSilhouette(
  cx: number,
  half: number,
  height: number,
  rand: () => number,
): { points: [number, number][]; apex: [number, number] } {
  const b = VIEW_H;
  const apexX = cx + (rand() - 0.5) * half * 0.24;
  const apex: [number, number] = [apexX, b - height];
  const leftHalf = half * (0.8 + rand() * 0.4);
  const rightHalf = half * (0.8 + rand() * 0.4);
  const leftSteps = 3 + Math.round(rand() * 2);
  const rightSteps = 3 + Math.round(rand() * 2);

  const points: [number, number][] = [[cx - leftHalf, b]];
  for (let k = 1; k <= leftSteps; k++) {
    const t = k / (leftSteps + 1);
    const x = cx - leftHalf + (apexX - (cx - leftHalf)) * t + (rand() - 0.5) * half * 0.07;
    const y = b - height * Math.pow(t, 1.3) + (rand() - 0.5) * height * 0.1;
    points.push([x, Math.min(y, b - 6)]);
  }
  points.push(apex);
  for (let k = 1; k <= rightSteps; k++) {
    const t = k / (rightSteps + 1);
    const x = apexX + (cx + rightHalf - apexX) * t + (rand() - 0.5) * half * 0.07;
    const y = b - height * Math.pow(1 - t, 1.3) + (rand() - 0.5) * height * 0.1;
    points.push([x, Math.min(y, b - 6)]);
  }
  points.push([cx + rightHalf, b]);

  // Some mountains earn a secondary summit on one flank
  if (rand() > 0.45) {
    const flankIndex = rand() > 0.5 ? 2 : points.length - 3;
    points[flankIndex][1] = Math.min(points[flankIndex][1], b - height * (0.55 + rand() * 0.18));
  }

  return { points, apex };
}

/** Nested onion-skin striations pulled toward the summit — the topographic-drawing
 *  texture. Wobble decays as rings shrink so inner lines stay smooth, and some
 *  striations are partial strokes for the hand-drawn feel. */
function buildContours(
  points: [number, number][],
  apex: [number, number],
  height: number,
  rand: () => number,
): RangeContour[] {
  const count = 15 + Math.round((height - MIN_HEIGHT) / 24);
  return Array.from({ length: count }, (_, k) => {
    const t = ((k + 1) / (count + 1)) * 0.85;
    const wobble = (2.5 + rand() * 3.5) * (1 - t * 0.85);
    let shifted = points.map(([x, y]): [number, number] => [
      x + (apex[0] - x) * t + (rand() - 0.5) * wobble,
      y + (apex[1] - y) * t + (rand() - 0.5) * wobble,
    ]);
    // Roughly a third of the striations are partial strokes along one flank
    if (rand() > 0.66 && shifted.length > 5) {
      shifted =
        rand() > 0.5
          ? shifted.slice(0, Math.ceil(shifted.length * 0.6))
          : shifted.slice(Math.floor(shifted.length * 0.4));
    }
    return { d: toFlowPath(shifted), opacity: +(0.36 - t * 0.2).toFixed(2) };
  });
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
    const rand = seededRandom(i * 1013 + 7);
    const cx = ((i + 0.5) / n) * VIEW_W;
    const height =
      MIN_HEIGHT + (n === 1 ? MAX_HEIGHT - MIN_HEIGHT : (i / (n - 1)) * (MAX_HEIGHT - MIN_HEIGHT));
    const half = (VIEW_W / n) * 1.35;
    const { points, apex } = buildSilhouette(cx, half, height, rand);

    return {
      entry,
      year: /\d{4}/.exec(entry.dateRange)?.[0] ?? '',
      label: entry.peakLabel ?? entry.place,
      leftPct: (apex[0] / VIEW_W) * 100,
      peakPct: ((VIEW_H - apex[1]) / VIEW_H) * 100,
      silhouette: toRidgePath(points, true),
      contours: buildContours(points, apex, height, rand),
    };
  });

  /** The tallest, most recent peak starts selected. */
  readonly selected = signal(this.peaks.length - 1);

  select(index: number): void {
    this.selected.set(index);
  }
}
