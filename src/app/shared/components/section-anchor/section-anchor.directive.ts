import { Directive, ElementRef, inject, input } from '@angular/core';
import type { OnDestroy, OnInit } from '@angular/core';
import { ScrollService } from '../../../core/services/scroll.service';

/**
 * Registers the host section with the ScrollService so the nav can track
 * the active section. Apply to every top-level <section> alongside its id.
 */
@Directive({
  selector: '[appSectionAnchor]',
})
export class SectionAnchorDirective implements OnInit, OnDestroy {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly scrollService = inject(ScrollService);

  readonly appSectionAnchor = input.required<string>();

  ngOnInit(): void {
    this.scrollService.registerSection(this.elementRef.nativeElement, this.appSectionAnchor());
  }

  ngOnDestroy(): void {
    this.scrollService.unregisterSection(this.elementRef.nativeElement);
  }
}
