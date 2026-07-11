import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { PORTFOLIO } from '../../../core/content/portfolio.config';
import { ScrollService } from '../../../core/services/scroll.service';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="footer">
      <div class="footer__content section-shell">
        <p class="footer__copy">
          © {{ year }} {{ line }} <span class="footer__note">· {{ stackNote }}</span>
        </p>
        <div class="footer__links">
          @for (social of socials; track social.label) {
            <a
              [href]="social.url"
              [target]="social.icon === 'email' ? null : '_blank'"
              rel="noreferrer"
              [attr.aria-label]="social.label">
              {{ social.label }}
            </a>
          }
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
      font-size: 0.875rem;
      color: var(--color-text-muted);
      margin: 0;
    }

    .footer__note {
      font-family: var(--font-mono);
      font-size: 0.78rem;
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
      font-size: 0.875rem;
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
  readonly year = new Date().getFullYear();
  readonly line = PORTFOLIO.footer.line;
  readonly stackNote = PORTFOLIO.footer.stackNote;
  readonly socials = PORTFOLIO.identity.socials;
}
