import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { MarqueeComponent } from '../../shared/components/marquee/marquee.component';
import { NavComponent } from '../../shared/components/nav/nav.component';
import { AboutComponent } from '../about/about.component';
import { BeyondComponent } from '../beyond/beyond.component';
import { ContactComponent } from '../contact/contact.component';
import { HeroComponent } from '../hero/hero.component';
import { JourneyComponent } from '../journey/journey.component';
import { ProjectsComponent } from '../projects/projects.component';
import { SkillsComponent } from '../skills/skills.component';

@Component({
  selector: 'app-home',
  imports: [
    NavComponent,
    MarqueeComponent,
    HeroComponent,
    AboutComponent,
    JourneyComponent,
    SkillsComponent,
    ProjectsComponent,
    BeyondComponent,
    ContactComponent,
    FooterComponent,
  ],
  template: `
    <a class="skip-link" href="#main">Skip to content</a>

    <div class="app-container">
      <app-nav />

      <div class="main-content">
        <main id="main">
          <app-hero />

          <app-marquee />

          @defer (hydrate on viewport) {
            <app-about />
          } @placeholder {
            <div class="defer-placeholder" aria-hidden="true"></div>
          }

          @defer (hydrate on viewport) {
            <app-journey />
          } @placeholder {
            <div class="defer-placeholder" style="--placeholder-height: 720px" aria-hidden="true"></div>
          }

          @defer (hydrate on viewport) {
            <app-skills />
          } @placeholder {
            <div class="defer-placeholder" aria-hidden="true"></div>
          }

          @defer (hydrate on viewport) {
            <app-projects />
          } @placeholder {
            <div class="defer-placeholder" style="--placeholder-height: 560px" aria-hidden="true"></div>
          }

          @defer (hydrate on viewport) {
            <app-beyond />
          } @placeholder {
            <div class="defer-placeholder" style="--placeholder-height: 240px" aria-hidden="true"></div>
          }

          @defer (hydrate on viewport) {
            <app-contact />
          } @placeholder {
            <div class="defer-placeholder" style="--placeholder-height: 640px" aria-hidden="true"></div>
          }
        </main>

        <app-footer topTarget="hero" />
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
