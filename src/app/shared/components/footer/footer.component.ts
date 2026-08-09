import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BUILD_DATE } from '../../../core/build-info';
import { PORTFOLIO } from '../../../core/content/portfolio.config';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

@Component({
  selector: 'app-footer',
  template: `
    <footer class="footer">
      <div class="footer__content section-shell">
        <p class="footer__copy">
          © {{ year }} {{ line }}
          <span class="footer__note">· {{ stackNote }} · updated {{ updated }}</span>
        </p>
        <div class="footer__links">
          @for (social of socials; track social.label) {
            <a
              [href]="social.url"
              [target]="social.icon === 'email' ? null : '_blank'"
              rel="noreferrer"
              [attr.aria-label]="social.label"
            >
              {{ social.label }}
            </a>
          }
          <!-- Real anchor like the nav links: hash in the URL, middle-click,
               crawlable. Smooth scroll comes from html { scroll-behavior }. -->
          <a class="footer__top" [href]="'#' + topTarget()" aria-label="Back to top">↑ Top</a>
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

    .footer__links a {
      color: var(--color-text-muted);
      background: none;
      border: 0;
      padding: 0;
      font-size: 0.875rem;
      transition: color 180ms ease;
    }

    .footer__links a:hover {
      color: var(--color-primary);
    }

    /* Small text, honest target: padding grows the hit area past 44px while
       the negative margin cancels it from layout, so nothing looks bigger. */
    .footer__links .footer__top {
      padding: var(--space-3);
      margin: calc(-1 * var(--space-3));
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
  readonly topTarget = input('hero');
  readonly year = new Date().getFullYear();
  // Parsed from the committed build stamp, never the visitor's clock — the
  // prerendered HTML and the hydrated app must agree on the same string.
  readonly updated = `${MONTHS[Number(BUILD_DATE.slice(5, 7)) - 1]} ${BUILD_DATE.slice(0, 4)}`;
  readonly line = PORTFOLIO.footer.line;
  readonly stackNote = PORTFOLIO.footer.stackNote;
  readonly socials = PORTFOLIO.identity.socials;
}
