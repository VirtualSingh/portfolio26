import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PORTFOLIO } from '../../core/content/portfolio.config';
import { ScrollService } from '../../core/services/scroll.service';
import { SectionAnchorDirective } from '../../shared/components/section-anchor/section-anchor.directive';
import { BlackHoleComponent } from './black-hole/black-hole.component';

@Component({
  selector: 'app-hero',
  imports: [SectionAnchorDirective, BlackHoleComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  private readonly scrollService = inject(ScrollService);

  readonly greeting = PORTFOLIO.identity.greeting;
  readonly firstName = PORTFOLIO.identity.firstName;
  readonly lastName = PORTFOLIO.identity.lastName;
  readonly role = PORTFOLIO.identity.role;
  readonly tagline = PORTFOLIO.identity.tagline;
  readonly proofLine = PORTFOLIO.identity.proofLine;
  readonly resume = PORTFOLIO.identity.resume;
  readonly ascent = PORTFOLIO.identity.ascent;

  scrollTo(id: string): void {
    this.scrollService.scrollToSection(id);
  }
}
