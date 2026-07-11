import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';

type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly storageKey = 'pushpendra-portfolio-theme';
  private readonly themeState = signal<Theme>('light');

  readonly theme = computed(() => this.themeState());

  init(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const stored = window.localStorage.getItem(this.storageKey);
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = stored === 'light' || stored === 'dark' ? stored : systemPrefersDark ? 'dark' : 'light';

    this.setTheme(theme);
  }

  toggle(): void {
    this.setTheme(this.themeState() === 'dark' ? 'light' : 'dark');
  }

  private setTheme(theme: Theme): void {
    this.themeState.set(theme);

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.document.documentElement.dataset['theme'] = theme;
    window.localStorage.setItem(this.storageKey, theme);
  }
}