import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import type { OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { environment } from '../../../environments/environment';
import { PORTFOLIO } from '../../core/content/portfolio.config';
import { ScrollRevealDirective } from '../../shared/components/scroll-reveal/scroll-reveal.directive';
import { SectionAnchorDirective } from '../../shared/components/section-anchor/section-anchor.directive';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';

type ToastState = { type: 'success' | 'error'; message: string } | null;

/** Humans can't validly fill three fields in under 3s; bots do it instantly. */
const MIN_FILL_MS = 3000;
/** One message a minute is plenty — throttles double-clicks and reply-spam alike. */
const COOLDOWN_MS = 60_000;

@Component({
  selector: 'app-contact',
  imports: [
    ReactiveFormsModule,
    ScrollRevealDirective,
    SectionAnchorDirective,
    SectionHeaderComponent,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent implements OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private toastTimer?: number;

  readonly content = PORTFOLIO.contact;
  readonly formCopy = PORTFOLIO.contact.form;
  readonly resume = PORTFOLIO.identity.resume;

  /** A form that can only fail is a trap — when the EmailJS keys aren't
   *  configured yet, the form yields to a direct-email panel instead. */
  readonly formConfigured = Boolean(
    environment.emailJs.serviceId &&
    environment.emailJs.templateId &&
    environment.emailJs.publicKey,
  );

  readonly emailHref =
    PORTFOLIO.contact.channels.find((channel) => channel.kind === 'email')?.href ?? '';

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(20)]],
  });

  readonly submitting = signal(false);
  readonly toast = signal<ToastState>(null);

  /** Honeypot — deliberately outside the FormGroup so it never affects validity. */
  readonly trap = signal('');

  // Both timestamps stay 0 until a browser event sets them — prerender-safe.
  private interactiveAt = 0;
  private cooldownUntil = 0;

  constructor() {
    // Start the bot-timing clock only once the form is actually usable;
    // afterNextRender never runs during prerender.
    afterNextRender(() => {
      this.interactiveAt = Date.now();
    });
  }

  ngOnDestroy(): void {
    if (this.toastTimer) {
      window.clearTimeout(this.toastTimer);
    }
  }

  async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      // Bring the first offender into view — focus() scrolls to it natively
      setTimeout(() => {
        this.host.nativeElement.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      });
      return;
    }

    if (!this.formConfigured) {
      this.showToast('error', this.formCopy.notConfiguredMessage);
      return;
    }

    if (Date.now() < this.cooldownUntil) {
      this.showToast('success', this.formCopy.cooldownNote);
      return;
    }

    // Filled honeypot or an impossibly fast submit — pretend it worked so
    // bots learn nothing, but never call EmailJS.
    if (this.trap() || (this.interactiveAt && Date.now() - this.interactiveAt < MIN_FILL_MS)) {
      this.finishAsSent();
      return;
    }

    this.submitting.set(true);

    try {
      await emailjs.send(
        environment.emailJs.serviceId,
        environment.emailJs.templateId,
        {
          from_name: this.form.controls.name.value,
          from_email: this.form.controls.email.value,
          // The EmailJS template still expects a subject; the field is gone,
          // so every message files under one constant line.
          subject: 'Portfolio contact',
          message: this.form.controls.message.value,
        },
        { publicKey: environment.emailJs.publicKey },
      );

      this.finishAsSent();
    } catch {
      this.showToast('error', this.formCopy.errorMessage);
    } finally {
      this.submitting.set(false);
    }
  }

  /** Shared exit for real sends and silent drops — identical from the outside. */
  private finishAsSent(): void {
    this.form.reset();
    this.trap.set('');
    this.cooldownUntil = Date.now() + COOLDOWN_MS;
    this.showToast('success', this.formCopy.successMessage);
  }

  trapInput(event: Event): void {
    this.trap.set((event.target as HTMLInputElement).value);
  }

  fieldError(controlName: keyof typeof this.form.controls): string | null {
    const control = this.form.controls[controlName];
    if (!control.touched || !control.errors) {
      return null;
    }

    if (control.errors['required']) {
      return 'This field is required.';
    }

    if (control.errors['email']) {
      return 'Enter a valid email address.';
    }

    if (control.errors['minlength']) {
      return `At least ${control.errors['minlength'].requiredLength} characters, please.`;
    }

    return 'Invalid value.';
  }

  private showToast(type: 'success' | 'error', message: string): void {
    this.toast.set({ type, message });

    if (this.toastTimer) {
      window.clearTimeout(this.toastTimer);
    }

    this.toastTimer = window.setTimeout(() => this.toast.set(null), 6000);
  }
}
