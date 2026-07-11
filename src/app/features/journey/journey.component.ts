import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PORTFOLIO } from '../../core/content/portfolio.config';
import { ScrollRevealDirective } from '../../shared/components/scroll-reveal/scroll-reveal.directive';
import { SectionAnchorDirective } from '../../shared/components/section-anchor/section-anchor.directive';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { TechBadgeComponent } from '../../shared/components/tech-badge/tech-badge.component';

@Component({
  selector: 'app-journey',
  imports: [ScrollRevealDirective, SectionAnchorDirective, SectionHeaderComponent, TechBadgeComponent],
  templateUrl: './journey.component.html',
  styleUrl: './journey.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JourneyComponent {
  readonly content = PORTFOLIO.journey;
}
