import { ChangeDetectionStrategy, Component, ElementRef, inject, signal } from '@angular/core';
import type { OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { environment } from '../../../environments/environment';
import { PORTFOLIO } from '../../core/content/portfolio.config';
import { ScrollRevealDirective } from '../../shared/components/scroll-reveal/scroll-reveal.directive';
import { SectionAnchorDirective } from '../../shared/components/section-anchor/section-anchor.directive';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';

type ToastState = { type: 'success' | 'error'; message: string } | null;

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
    subject: ['', [Validators.required]],
    message: ['', [Validators.required, Validators.minLength(20)]],
  });

  readonly submitting = signal(false);
  readonly toast = signal<ToastState>(null);

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

    this.submitting.set(true);

    try {
      await emailjs.send(
        environment.emailJs.serviceId,
        environment.emailJs.templateId,
        {
          from_name: this.form.controls.name.value,
          from_email: this.form.controls.email.value,
          subject: this.form.controls.subject.value,
          message: this.form.controls.message.value,
        },
        { publicKey: environment.emailJs.publicKey },
      );

      this.form.reset();
      this.showToast('success', this.formCopy.successMessage);
    } catch {
      this.showToast('error', this.formCopy.errorMessage);
    } finally {
      this.submitting.set(false);
    }
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
