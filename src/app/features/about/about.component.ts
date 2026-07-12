import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PORTFOLIO } from '../../core/content/portfolio.config';
import { AscentSceneComponent } from '../../shared/components/ascent-scene/ascent-scene.component';
import { ScrollRevealDirective } from '../../shared/components/scroll-reveal/scroll-reveal.directive';
import { SectionAnchorDirective } from '../../shared/components/section-anchor/section-anchor.directive';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';

@Component({
  selector: 'app-about',
  imports: [
    AscentSceneComponent,
    ScrollRevealDirective,
    SectionAnchorDirective,
    SectionHeaderComponent,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  readonly content = PORTFOLIO.about;
}
