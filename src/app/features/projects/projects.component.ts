import { ChangeDetectionStrategy, Component, ViewChild, computed, inject, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { FEATURED_PROJECTS } from '../../core/content/portfolio.content';
import type { ElementRef } from '@angular/core';
import type { Project } from '../../core/models/project.model';
import { ScrollService } from '../../core/services/scroll.service';
import { ScrollRevealDirective } from '../../shared/components/scroll-reveal/scroll-reveal.directive';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { TechBadgeComponent } from '../../shared/components/tech-badge/tech-badge.component';

type ProjectFilter = 'All' | 'Angular' | 'JavaScript';

@Component({
  selector: 'app-projects',
  imports: [NgOptimizedImage, ScrollRevealDirective, SectionHeaderComponent, TechBadgeComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  animations: [
    trigger('cardStagger', [
      transition('* => *', [
        query(
          '.projects__card',
          [
            style({ opacity: 0, transform: 'translateY(20px)' }),
            stagger(90, [animate('380ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))]),
          ],
          { optional: true },
        ),
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  private readonly scrollService = inject(ScrollService);

  @ViewChild('sectionRef', { static: true }) sectionRef!: ElementRef<HTMLElement>;

  readonly filters: readonly ProjectFilter[] = ['All', 'Angular', 'JavaScript'];
  readonly selectedFilter = signal<ProjectFilter>('All');
  readonly projects = FEATURED_PROJECTS;
  readonly filteredProjects = computed(() => {
    const selected = this.selectedFilter();
    return selected === 'All' ? this.projects : this.projects.filter((project) => project.category === selected);
  });

  constructor() {
    queueMicrotask(() => this.scrollService.registerSection(this.sectionRef.nativeElement, 'projects'));
  }

  trackProject(index: number, project: Project): string {
    return `${project.id}-${index}`;
  }

  setFilter(filter: ProjectFilter): void {
    this.selectedFilter.set(filter);
  }
}