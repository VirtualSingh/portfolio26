import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, PLATFORM_ID, ViewChild, inject, signal } from '@angular/core';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import type { ElementRef, OnDestroy } from '@angular/core';
import { CURRENTLY_LEARNING, SKILL_CATEGORIES } from '../../core/content/portfolio.content';
import { ScrollService } from '../../core/services/scroll.service';
import { ScrollRevealDirective } from '../../shared/components/scroll-reveal/scroll-reveal.directive';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { TechBadgeComponent } from '../../shared/components/tech-badge/tech-badge.component';

@Component({
  selector: 'app-skills',
  imports: [ScrollRevealDirective, SectionHeaderComponent, TechBadgeComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
  animations: [
    trigger('categoryStagger', [
      transition(':enter', [
        query(
          '.skills__category',
          [
            style({ opacity: 0, transform: 'translateY(20px)' }),
            stagger(100, [animate('420ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))]),
          ],
          { optional: true },
        ),
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsComponent implements OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly scrollService = inject(ScrollService);
  private observer?: IntersectionObserver;

  @ViewChild('sectionRef', { static: true }) sectionRef!: ElementRef<HTMLElement>;

  readonly categories = SKILL_CATEGORIES;
  readonly learning = CURRENTLY_LEARNING;
  readonly barsVisible = signal(false);

  constructor() {
    queueMicrotask(() => this.initObservers());
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.scrollService.unregisterSection(this.sectionRef.nativeElement);
  }

  private initObservers(): void {
    this.scrollService.registerSection(this.sectionRef.nativeElement, 'skills');

    if (!isPlatformBrowser(this.platformId)) {
      this.barsVisible.set(true);
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          this.barsVisible.set(true);
          this.observer?.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    this.observer.observe(this.sectionRef.nativeElement);
  }
}