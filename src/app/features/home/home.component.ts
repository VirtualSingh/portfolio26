import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { META_TITLES, NAV_ITEMS } from '../../core/content/portfolio.content';
import { ScrollService } from '../../core/services/scroll.service';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { NavComponent } from '../../shared/components/nav/nav.component';
import { AboutComponent } from '../about/about.component';
import { BeyondComponent } from '../beyond/beyond.component';
import { ContactComponent } from '../contact/contact.component';
import { ExperienceComponent } from '../experience/experience.component';
import { FutureComponent } from '../future/future.component';
import { HeroComponent } from '../hero/hero.component';
import { ImpactComponent } from '../impact/impact.component';
import { JourneyComponent } from '../journey/journey.component';
import { ProjectsComponent } from '../projects/projects.component';
import { SkillsComponent } from '../skills/skills.component';

@Component({
  selector: 'app-home',
  imports: [
    NavComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    JourneyComponent,
    ExperienceComponent,
    ImpactComponent,
    ProjectsComponent,
    BeyondComponent,
    FutureComponent,
    ContactComponent,
    FooterComponent,
  ],
  template: `
    <div class="app-container">
      <app-nav [items]="navItems" />

      <div class="main-content">
        <main>
          <app-hero />

          @defer (on viewport) {
            <app-about />
          } @placeholder {
            <div class="defer-placeholder" aria-hidden="true"></div>
          }

          @defer (on viewport) {
            <app-skills />
          } @placeholder {
            <div class="defer-placeholder" aria-hidden="true"></div>
          }

          @defer (on viewport) {
            <app-journey />
          } @placeholder {
            <div class="defer-placeholder" aria-hidden="true"></div>
          }

          @defer (on viewport) {
            <app-experience />
          } @placeholder {
            <div class="defer-placeholder" aria-hidden="true"></div>
          }

          @defer (on viewport) {
            <app-impact />
          } @placeholder {
            <div class="defer-placeholder" aria-hidden="true"></div>
          }

          @defer (on viewport) {
            <app-projects />
          } @placeholder {
            <div class="defer-placeholder" aria-hidden="true"></div>
          }

          @defer (on viewport) {
            <app-beyond />
          } @placeholder {
            <div class="defer-placeholder" aria-hidden="true"></div>
          }

          @defer (on viewport) {
            <app-future />
          } @placeholder {
            <div class="defer-placeholder" aria-hidden="true"></div>
          }

          @defer (on viewport) {
            <app-contact />
          } @placeholder {
            <div class="defer-placeholder" aria-hidden="true"></div>
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
export class HomeComponent {
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
  private readonly scrollService = inject(ScrollService);

  readonly navItems = NAV_ITEMS;

  constructor() {
    effect(() => {
      const activeSection = this.scrollService.activeSection();
      const nextTitle = META_TITLES[activeSection] ?? META_TITLES['hero'];

      this.title.setTitle(nextTitle);
      this.meta.updateTag({
        name: 'description',
        content:
          activeSection === 'hero'
            ? 'Senior Angular Frontend Developer portfolio for Pushpendra Singh featuring production experience, projects, and contact information.'
            : `${nextTitle} for Pushpendra Singh's portfolio website.`,
      });
    });
  }
}
