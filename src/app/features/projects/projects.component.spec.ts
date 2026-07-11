import { TestBed } from '@angular/core/testing';
import { ProjectsComponent } from './projects.component';

describe('ProjectsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsComponent],
    }).compileComponents();
  });

  it('filters projects by category', () => {
    const fixture = TestBed.createComponent(ProjectsComponent);
    const component = fixture.componentInstance;

    component.setFilter('JavaScript');

    expect(component.filteredProjects().every((project) => project.category === 'JavaScript')).toBe(true);
  });
});