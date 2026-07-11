import { ChangeDetectionStrategy, Component, ViewChild, inject } from '@angular/core';
import type { ElementRef, OnDestroy } from '@angular/core';
import { CURRENTLY_LEARNING } from '../../core/content/portfolio.content';
import { ScrollService } from '../../core/services/scroll.service';
import { ScrollRevealDirective } from '../../shared/components/scroll-reveal/scroll-reveal.directive';

@Component({
  selector: 'app-future',
  imports: [ScrollRevealDirective],
  templateUrl: './future.component.html',
  styleUrl: './future.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FutureComponent implements OnDestroy {
  private readonly scrollService = inject(ScrollService);

  @ViewChild('sectionRef', { static: true }) sectionRef!: ElementRef<HTMLElement>;

  readonly exploring = CURRENTLY_LEARNING;

  scrollToContact(): void {
    this.scrollService.scrollToSection('contact');
  }

  constructor() {
    queueMicrotask(() => this.scrollService.registerSection(this.sectionRef.nativeElement, 'future'));
  }

  ngOnDestroy(): void {
    this.scrollService.unregisterSection(this.sectionRef.nativeElement);
  }
}
