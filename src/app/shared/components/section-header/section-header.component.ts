import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ScrollRevealDirective } from '../scroll-reveal/scroll-reveal.directive';

@Component({
  selector: 'app-section-header',
  imports: [ScrollRevealDirective],
  template: `
    <div class="section-header" appScrollReveal>
      <h2>
        {{ titleStart() }}
        @if (accentWord()) {
          <em class="accent-word">{{ accentWord() }}</em>
        }
        {{ titleEnd() }}
      </h2>
      @if (description()) {
        <p class="section-header__description">{{ description() }}</p>
      }
    </div>
  `,
  styles: `
    .section-header {
      display: grid;
      gap: var(--space-3);
      margin-bottom: var(--space-10);
      max-width: 680px;
    }

    .section-header__description {
      max-width: 60ch;
      line-height: 1.7;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionHeaderComponent {
  readonly titleStart = input('');
  readonly titleEnd = input('');
  readonly accentWord = input('');
  readonly description = input('');
}
