import { ChangeDetectionStrategy, Component, ViewChild, inject } from '@angular/core';
import type { ElementRef, OnDestroy } from '@angular/core';
import { EXPERIENCE_ITEMS } from '../../core/content/portfolio.content';
import { ScrollService } from '../../core/services/scroll.service';
import { ScrollRevealDirective } from '../../shared/components/scroll-reveal/scroll-reveal.directive';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { TechBadgeComponent } from '../../shared/components/tech-badge/tech-badge.component';

@Component({
  selector: 'app-journey',
  imports: [ScrollRevealDirective, SectionHeaderComponent, TechBadgeComponent],
  templateUrl: './journey.component.html',
  styleUrl: './journey.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JourneyComponent implements OnDestroy {
  private readonly scrollService = inject(ScrollService);

  @ViewChild('sectionRef', { static: true }) sectionRef!: ElementRef<HTMLElement>;

  readonly items = [...EXPERIENCE_ITEMS].reverse();

  constructor() {
    queueMicrotask(() => this.scrollService.registerSection(this.sectionRef.nativeElement, 'journey'));
  }

  ngOnDestroy(): void {
    this.scrollService.unregisterSection(this.sectionRef.nativeElement);
  }
}
