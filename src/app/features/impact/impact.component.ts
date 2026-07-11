import { ChangeDetectionStrategy, Component, ViewChild, inject } from '@angular/core';
import type { ElementRef, OnDestroy } from '@angular/core';
import { IMPACT_METRICS } from '../../core/content/portfolio.content';
import { ScrollService } from '../../core/services/scroll.service';
import { ScrollRevealDirective } from '../../shared/components/scroll-reveal/scroll-reveal.directive';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';

@Component({
  selector: 'app-impact',
  imports: [ScrollRevealDirective, SectionHeaderComponent],
  templateUrl: './impact.component.html',
  styleUrl: './impact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImpactComponent implements OnDestroy {
  private readonly scrollService = inject(ScrollService);

  @ViewChild('sectionRef', { static: true }) sectionRef!: ElementRef<HTMLElement>;

  readonly metrics = IMPACT_METRICS;

  constructor() {
    queueMicrotask(() => this.scrollService.registerSection(this.sectionRef.nativeElement, 'impact'));
  }

  ngOnDestroy(): void {
    this.scrollService.unregisterSection(this.sectionRef.nativeElement);
  }
}
