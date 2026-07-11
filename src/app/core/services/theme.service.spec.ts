import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: (query: string) => ({
        matches: query.includes('dark'),
        media: query,
        onchange: null,
        addListener: () => undefined,
        removeListener: () => undefined,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
        dispatchEvent: () => false,
      }),
    });

    window.localStorage.clear();
    TestBed.configureTestingModule({});
  });

  it('initializes theme from system preference when storage is empty', () => {
    const service = TestBed.inject(ThemeService);

    service.init();

    expect(service.theme()).toBe('dark');
  });

  it('toggles theme and persists the next value', () => {
    const service = TestBed.inject(ThemeService);
    service.init();

    service.toggle();

    expect(service.theme()).toBe('light');
    expect(window.localStorage.getItem('pushpendra-portfolio-theme')).toBe('light');
  });
});