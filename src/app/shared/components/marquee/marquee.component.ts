import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PORTFOLIO } from '../../../core/content/portfolio.config';

/**
 * The ink ticker: a slow band of craft phrases between the hero and the story.
 * Same ink as the Ascent scene's blocks, so the hero illustration and the strip
 * read as one material. Content lives in PORTFOLIO.marquee.
 */
@Component({
  selector: 'app-marquee',
  template: `
    <div class="marquee" aria-hidden="true">
      <div class="marquee__track">
        @for (copy of [0, 1]; track copy) {
          <div class="marquee__group">
            @for (item of items; track item) {
              <span class="marquee__item">{{ item }}</span>
              <svg class="marquee__spark" viewBox="0 0 10 10" width="10" height="10">
                <path d="M5 0 6.2 3.8 10 5 6.2 6.2 5 10 3.8 6.2 0 5 3.8 3.8Z" fill="currentColor" />
              </svg>
            }
          </div>
        }
      </div>
    </div>
    <p class="visually-hidden">{{ items.join(', ') }}</p>
  `,
  styles: `
    .marquee {
      overflow: hidden;
      background: var(--color-text-main);
      padding: var(--space-4) 0;
    }

    .marquee__track {
      display: flex;
      width: max-content;
      animation: marquee-scroll 36s linear infinite;
    }

    .marquee:hover .marquee__track {
      animation-play-state: paused;
    }

    .marquee__group {
      display: flex;
      align-items: center;
      flex-shrink: 0;
    }

    .marquee__item {
      font-family: var(--font-mono);
      font-size: 0.875rem;
      letter-spacing: 0.08em;
      color: var(--color-bg);
      white-space: nowrap;
      padding: 0 var(--space-6);
    }

    .marquee__spark {
      color: var(--color-primary);
      flex-shrink: 0;
    }

    @keyframes marquee-scroll {
      from {
        transform: translateX(0);
      }
      to {
        transform: translateX(-50%);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .marquee__track {
        animation: none;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarqueeComponent {
  readonly items = PORTFOLIO.marquee.items;
}
