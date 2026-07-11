import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PORTFOLIO } from '../../core/content/portfolio.config';
import { ScrollRevealDirective } from '../../shared/components/scroll-reveal/scroll-reveal.directive';
import { SectionAnchorDirective } from '../../shared/components/section-anchor/section-anchor.directive';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';

@Component({
  selector: 'app-beyond',
  imports: [ScrollRevealDirective, SectionAnchorDirective, SectionHeaderComponent],
  templateUrl: './beyond.component.html',
  styleUrl: './beyond.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeyondComponent {
  readonly content = PORTFOLIO.beyond;

  /** Loop counters for the decorative Night Garden scene — presentation only. */
  readonly flowers = [1, 2, 3];
  readonly petals = [1, 2, 3, 4];
  readonly lights = [1, 2, 3, 4, 5];
  readonly foliage = ['left-a', 'left-b', 'mid-a', 'mid-b', 'right-a', 'right-b'];
}
