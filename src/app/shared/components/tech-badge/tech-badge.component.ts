import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-tech-badge',
  template: `
    <span class="badge" [class.badge--muted]="tone() === 'muted'">
      <span class="badge__icon" aria-hidden="true">{{ icon() }}</span>
      <span>{{ label() }}</span>
    </span>
  `,
  styles: `
    .badge {
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
      min-height: 36px;
      padding: 0 var(--space-4);
      border: 1px solid color-mix(in srgb, var(--color-primary) 20%, var(--color-border));
      border-radius: var(--radius-pill);
      background: color-mix(in srgb, var(--color-primary-light) 75%, transparent);
      color: var(--color-text-main);
      font-family: var(--font-mono);
      font-size: 0.84rem;
      white-space: nowrap;
    }

    .badge--muted {
      border-color: var(--color-border);
      background: color-mix(in srgb, var(--color-surface) 75%, transparent);
    }

    .badge__icon {
      font-size: 0.9rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechBadgeComponent {
  readonly label = input.required<string>();
  readonly icon = input('•');
  readonly tone = input<'default' | 'muted'>('default');
}