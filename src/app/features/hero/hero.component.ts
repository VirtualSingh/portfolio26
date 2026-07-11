import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import type { OnDestroy, OnInit } from '@angular/core';
import { HERO_ROLES } from '../../core/content/portfolio.content';
import { ScrollService } from '../../core/services/scroll.service';
import { ScrollRevealDirective } from '../../shared/components/scroll-reveal/scroll-reveal.directive';

@Component({
  selector: 'app-hero',
  imports: [ScrollRevealDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  animations: [
    trigger('heroIntro', [
      transition(':enter', [
        query(
          '.hero__animate',
          [
            style({ opacity: 0, transform: 'translateY(24px)' }),
            stagger(110, [animate('500ms cubic-bezier(0.22, 1, 0.36, 1)', style({ opacity: 1, transform: 'translateY(0)' }))]),
          ],
          { optional: true },
        ),
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly scrollService = inject(ScrollService);
  private timerId?: number;

  readonly resumeUrl = '/Pushpendra_Singh_Resume.pdf';
  readonly roleIndex = signal(0);
  readonly characterCount = signal(0);
  readonly deleting = signal(false);
  readonly currentRole = computed(() => HERO_ROLES[this.roleIndex()].slice(0, this.characterCount()));

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.characterCount.set(HERO_ROLES[0].length);
      return;
    }

    this.tickTypewriter();
  }

  ngOnDestroy(): void {
    if (this.timerId) {
      window.clearTimeout(this.timerId);
    }
  }

  scrollTo(id: string): void {
    this.scrollService.scrollToSection(id);
  }

  private tickTypewriter(): void {
    const activeRole = HERO_ROLES[this.roleIndex()];
    const isDeleting = this.deleting();
    const nextLength = isDeleting ? this.characterCount() - 1 : this.characterCount() + 1;

    this.characterCount.set(Math.max(0, Math.min(activeRole.length, nextLength)));

    if (!isDeleting && nextLength === activeRole.length) {
      this.deleting.set(true);
      this.timerId = window.setTimeout(() => this.tickTypewriter(), 1400);
      return;
    }

    if (isDeleting && nextLength === 0) {
      this.deleting.set(false);
      this.roleIndex.set((this.roleIndex() + 1) % HERO_ROLES.length);
      this.timerId = window.setTimeout(() => this.tickTypewriter(), 240);
      return;
    }

    this.timerId = window.setTimeout(() => this.tickTypewriter(), isDeleting ? 42 : 84);
  }
}