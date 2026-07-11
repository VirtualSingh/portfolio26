import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ScrollService } from '../../../core/services/scroll.service';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="footer">
      <div class="footer__content section-shell">
        <p class="footer__copy">© 2025 Pushpendra Singh. Thanks for visiting. 🩵</p>
        <div class="footer__links">
          <a href="https://github.com/virtualsingh" target="_blank" rel="noreferrer" aria-label="Open GitHub profile">GitHub</a>
          <a href="https://www.linkedin.com/in/ps-rajput" target="_blank" rel="noreferrer" aria-label="Open LinkedIn profile">LinkedIn</a>
          <a href="mailto:singh16195@gmail.com" aria-label="Send an email to Pushpendra Singh">Email</a>
          <button type="button" (click)="scrollService.scrollToSection(topTarget())" aria-label="Back to top">↑ Top</button>
        </div>
      </div>
    </footer>
  `,
  styles: `
    .footer {
      border-top: 1px solid var(--color-border);
      padding: var(--space-6) 0;
    }

    .footer__content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: var(--space-4);
    }

    .footer__copy {
      font-size: 0.88rem;
      color: var(--color-text-muted);
      margin: 0;
    }

    .footer__links {
      display: flex;
      align-items: center;
      gap: var(--space-5);
      flex-wrap: wrap;
    }

    .footer__links a,
    .footer__links button {
      color: var(--color-text-muted);
      background: none;
      border: 0;
      padding: 0;
      font-size: 0.88rem;
      transition: color 180ms ease;
    }

    .footer__links a:hover,
    .footer__links button:hover {
      color: var(--color-primary);
    }

    @media (max-width: 768px) {
      .footer__content {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  readonly scrollService = inject(ScrollService);
  readonly topTarget = input('hero');
}