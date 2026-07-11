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
}
