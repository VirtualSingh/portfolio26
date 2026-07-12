import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  input,
  viewChild,
} from '@angular/core';
import type { BlackHoleScene } from './black-hole.scene';

/** Ambient WebGL singularity behind the hero copy. Browser-only: the scene
 *  module (and three.js with it) is dynamically imported after first render,
 *  during idle time, so prerendering and the initial bundle never see it.
 *  The loop only runs while the canvas is on screen and the tab is visible;
 *  reduced-motion visitors get a single still frame. */
@Component({
  selector: 'app-black-hole',
  template: '<canvas #canvas></canvas>',
  styles: `
    :host {
      display: block;
      position: absolute;
      inset: 0;
    }
    canvas {
      display: block;
      width: 100%;
      height: 100%;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlackHoleComponent {
  /** Screen-space lean of the singularity and its disk, in degrees. */
  readonly tiltDeg = input(25);

  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  private scene: BlackHoleScene | undefined;
  private inView = false;
  private reducedMotion = false;
  private destroyed = false;

  constructor() {
    this.destroyRef.onDestroy(() => (this.destroyed = true));
    afterNextRender(() => {
      const idle: (cb: () => void) => void =
        'requestIdleCallback' in window
          ? (cb) => requestIdleCallback(cb, { timeout: 2000 })
          : (cb) => setTimeout(cb, 300);
      idle(() => void this.init());
    });
  }

  private async init(): Promise<void> {
    const { createBlackHoleScene } = await import('./black-hole.scene');
    if (this.destroyed) {
      return;
    }
    const element = this.host.nativeElement;
    const small = window.innerWidth < 768;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = createBlackHoleScene(this.canvasRef().nativeElement, {
      tiltDeg: this.tiltDeg(),
      instanceCount: small ? 2600 : 4500,
      maxPixelRatio: small ? 1.5 : 2,
    });
    this.scene = scene;
    scene.setSize(element.clientWidth, element.clientHeight);

    const resizeObserver = new ResizeObserver(([entry]) => {
      scene.setSize(entry.contentRect.width, entry.contentRect.height);
    });
    resizeObserver.observe(element);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        this.inView = entry.isIntersecting;
        this.syncPlayback();
      },
      { threshold: 0.05 },
    );
    intersectionObserver.observe(element);

    const onVisibility = (): void => this.syncPlayback();
    document.addEventListener('visibilitychange', onVisibility);

    this.destroyRef.onDestroy(() => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      scene.dispose();
      this.scene = undefined;
    });
  }

  private syncPlayback(): void {
    if (!this.scene) {
      return;
    }
    if (this.reducedMotion) {
      this.scene.stop();
      this.scene.renderOnce();
      return;
    }
    if (this.inView && !document.hidden) {
      this.scene.start();
    } else {
      this.scene.stop();
    }
  }
}
