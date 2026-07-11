import { ChangeDetectionStrategy, Component, ViewChild, inject } from '@angular/core';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import type { ElementRef, OnDestroy } from '@angular/core';
import { EXPERIENCE_ITEMS } from '../../core/content/portfolio.content';
import { ScrollService } from '../../core/services/scroll.service';
import { ScrollRevealDirective } from '../../shared/components/scroll-reveal/scroll-reveal.directive';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { TechBadgeComponent } from '../../shared/components/tech-badge/tech-badge.component';

@Component({
  selector: 'app-experience',
  imports: [ScrollRevealDirective, SectionHeaderComponent, TechBadgeComponent],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
  animations: [
    trigger('timelineIn', [
      transition(':enter', [
        query(
          '.experience__item',
          [
            style({ opacity: 0, transform: 'translateY(24px)' }),
            stagger(120, [animate('440ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))]),
          ],
          { optional: true },
        ),
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceComponent implements OnDestroy {
  private readonly scrollService = inject(ScrollService);

  @ViewChild('sectionRef', { static: true }) sectionRef!: ElementRef<HTMLElement>;

  readonly items = EXPERIENCE_ITEMS;

  constructor() {
    queueMicrotask(() => this.scrollService.registerSection(this.sectionRef.nativeElement, 'experience'));
  }

  ngOnDestroy(): void {
    this.scrollService.unregisterSection(this.sectionRef.nativeElement);
  }
}