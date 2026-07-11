import { ChangeDetectionStrategy, Component, ViewChild, inject } from '@angular/core';
import type { ElementRef, OnDestroy } from '@angular/core';
import { BEYOND_ITEMS } from '../../core/content/portfolio.content';
import { ScrollService } from '../../core/services/scroll.service';
import { ScrollRevealDirective } from '../../shared/components/scroll-reveal/scroll-reveal.directive';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';

@Component({
  selector: 'app-beyond',
  imports: [ScrollRevealDirective, SectionHeaderComponent],
  templateUrl: './beyond.component.html',
  styleUrl: './beyond.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeyondComponent implements OnDestroy {
  private readonly scrollService = inject(ScrollService);

  @ViewChild('sectionRef', { static: true }) sectionRef!: ElementRef<HTMLElement>;

  readonly items = BEYOND_ITEMS;

  constructor() {
    queueMicrotask(() => this.scrollService.registerSection(this.sectionRef.nativeElement, 'beyond'));
  }

  ngOnDestroy(): void {
    this.scrollService.unregisterSection(this.sectionRef.nativeElement);
  }
}
