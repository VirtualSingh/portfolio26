import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { ScrollService } from '../../../core/services/scroll.service';
import type { NavItem } from '../../../core/content/portfolio.content';

@Component({
  selector: 'app-nav',
  template: `
    <!-- Desktop: fixed left sidebar -->
    <aside class="sidebar" [class.sidebar--open]="menuOpen()">
      <div class="sidebar__brand">
        <button type="button" class="sidebar__monogram" (click)="goTo('hero')" aria-label="Scroll to top">
          PS
        </button>
      </div>

      <nav class="sidebar__nav" aria-label="Primary navigation">
        @for (item of items(); track item.id) {
          <button
            type="button"
            class="sidebar__link"
            [class.sidebar__link--active]="activeSection() === item.id"
            (click)="handleNavClick(item.id)">
            <span class="sidebar__number">{{ item.number }}</span>
            <span class="sidebar__label">{{ item.label }}</span>
            <span class="sidebar__dot" aria-hidden="true"></span>
          </button>
        }
      </nav>

      <div class="sidebar__footer">
        <a href="https://www.linkedin.com/in/ps-rajput" target="_blank" rel="noreferrer" aria-label="LinkedIn profile" class="sidebar__social-link">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
        <a href="https://github.com/virtualsingh" target="_blank" rel="noreferrer" aria-label="GitHub profile" class="sidebar__social-link">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
          </svg>
        </a>
        <a href="mailto:singh16195@gmail.com" aria-label="Send email" class="sidebar__social-link">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="2" y="4" width="20" height="16" rx="2"/>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
          </svg>
        </a>
      </div>
    </aside>

    <!-- Mobile: fixed top bar -->
    <header class="topbar">
      <button type="button" class="topbar__brand" (click)="goTo('hero')" aria-label="Scroll to top">
        PS
      </button>
      <button
        type="button"
        class="topbar__hamburger"
        (click)="menuOpen.update(v => !v)"
        [attr.aria-expanded]="menuOpen()"
        aria-label="Toggle navigation menu">
        @if (menuOpen()) {
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        } @else {
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
            <path d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        }
      </button>
    </header>

    <!-- Mobile nav overlay -->
    @if (menuOpen()) {
      <div class="nav-overlay" (click)="menuOpen.set(false)" aria-hidden="true"></div>
    }
  `,
  styles: `
    /* ─── Sidebar (desktop) ─── */
    .sidebar {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      width: var(--sidebar-width);
      z-index: 40;
      display: flex;
      flex-direction: column;
      padding: 2rem 1.25rem;
      border-right: 1px solid var(--color-border);
      background: var(--color-bg);
    }

    .sidebar__brand {
      margin-bottom: 2.5rem;
    }

    .sidebar__monogram {
      border: 0;
      background: none;
      font-family: cursive, serif;
      font-size: 1.8rem;
      font-weight: 700;
      color: var(--color-primary);
      cursor: pointer;
      padding: 0;
      line-height: 1;
      letter-spacing: -0.04em;
      transition: opacity 180ms ease;

      &:hover {
        opacity: 0.75;
      }
    }

    .sidebar__nav {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2px;
      overflow-y: auto;
    }

    .sidebar__link {
      position: relative;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
      border: 0;
      border-radius: var(--radius-sm);
      background: none;
      color: var(--color-text-muted);
      text-align: left;
      cursor: pointer;
      transition: color 180ms ease, background 180ms ease;
      font-size: 0.88rem;
      font-weight: 500;
      width: 100%;

      &:hover {
        color: var(--color-text-main);
        background: var(--color-surface);
      }
    }

    .sidebar__link--active {
      color: var(--color-primary);
      background: var(--color-primary-light);
      font-weight: 700;
    }

    .sidebar__number {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      min-width: 22px;
      opacity: 0.7;
    }

    .sidebar__label {
      flex: 1;
    }

    .sidebar__dot {
      display: none;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--color-primary);
      flex-shrink: 0;
    }

    .sidebar__link--active .sidebar__dot {
      display: block;
    }

    .sidebar__footer {
      display: flex;
      gap: 16px;
      padding-top: 1.5rem;
      border-top: 1px solid var(--color-border);
      margin-top: 1rem;
    }

    .sidebar__social-link {
      color: var(--color-text-muted);
      display: flex;
      align-items: center;
      transition: color 180ms ease;

      &:hover {
        color: var(--color-primary);
      }
    }

    /* ─── Top bar (mobile) ─── */
    .topbar {
      display: none;
    }

    .topbar__brand {
      border: 0;
      background: none;
      font-family: cursive, serif;
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--color-primary);
      cursor: pointer;
      padding: 0;
      letter-spacing: -0.04em;
    }

    .topbar__hamburger {
      border: 1px solid var(--color-border);
      border-radius: var(--radius-sm);
      background: var(--color-bg);
      color: var(--color-text-main);
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .nav-overlay {
      position: fixed;
      inset: 0;
      background: rgba(26, 26, 46, 0.4);
      z-index: 38;
      backdrop-filter: blur(2px);
    }

    /* ─── Mobile breakpoint ─── */
    @media (max-width: 1024px) {
      .sidebar {
        z-index: 39;
        transform: translateX(-100%);
        transition: transform 280ms cubic-bezier(0.22, 1, 0.36, 1);
        box-shadow: 8px 0 48px -16px rgba(26, 26, 46, 0.2);
      }

      .sidebar--open {
        transform: translateX(0);
      }

      .topbar {
        display: flex;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: var(--topbar-height);
        align-items: center;
        justify-content: space-between;
        padding: 0 1.5rem;
        background: rgba(255, 255, 255, 0.92);
        backdrop-filter: blur(16px);
        border-bottom: 1px solid var(--color-border);
        z-index: 30;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  private readonly scrollService = inject(ScrollService);

  readonly items = input.required<readonly NavItem[]>();
  readonly menuOpen = signal(false);
  readonly activeSection = this.scrollService.activeSection.asReadonly();

  goTo(id: string): void {
    this.scrollService.scrollToSection(id);
  }

  handleNavClick(id: string): void {
    this.menuOpen.set(false);
    this.goTo(id);
  }
}
