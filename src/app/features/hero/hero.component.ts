import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import type { OnDestroy, OnInit } from '@angular/core';
import { PORTFOLIO } from '../../core/content/portfolio.config';
import { ScrollService } from '../../core/services/scroll.service';
import { SectionAnchorDirective } from '../../shared/components/section-anchor/section-anchor.directive';

@Component({
  selector: 'app-hero',
  imports: [SectionAnchorDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly scrollService = inject(ScrollService);
  private timerId?: number;

  readonly greeting = PORTFOLIO.identity.greeting;
  readonly firstName = PORTFOLIO.identity.firstName;
  readonly lastName = PORTFOLIO.identity.lastName;
  readonly roles = PORTFOLIO.identity.roles;
  readonly tagline = PORTFOLIO.identity.tagline;
  readonly proofLine = PORTFOLIO.identity.proofLine;
  readonly resume = PORTFOLIO.identity.resume;

  readonly roleIndex = signal(0);
  readonly characterCount = signal(0);
  readonly deleting = signal(false);
  readonly currentRole = computed(() => this.roles[this.roleIndex()].slice(0, this.characterCount()));

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.characterCount.set(this.roles[0].length);
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.characterCount.set(this.roles[0].length);
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
    const activeRole = this.roles[this.roleIndex()];
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
      this.roleIndex.set((this.roleIndex() + 1) % this.roles.length);
      this.timerId = window.setTimeout(() => this.tickTypewriter(), 240);
      return;
    }

    this.timerId = window.setTimeout(() => this.tickTypewriter(), isDeleting ? 42 : 84);
  }
}
