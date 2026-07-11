import { ChangeDetectionStrategy, Component, ViewChild, inject, signal } from '@angular/core';
import type { ElementRef, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { environment } from '../../../environments/environment';
import { ScrollService } from '../../core/services/scroll.service';
import { ScrollRevealDirective } from '../../shared/components/scroll-reveal/scroll-reveal.directive';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';

type ToastState = { type: 'success' | 'error'; message: string } | null;

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, ScrollRevealDirective, SectionHeaderComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent implements OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly scrollService = inject(ScrollService);
  private toastTimer?: number;

  @ViewChild('sectionRef', { static: true }) sectionRef!: ElementRef<HTMLElement>;

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required]],
    message: ['', [Validators.required, Validators.minLength(20)]],
  });

  readonly submitting = signal(false);
  readonly toast = signal<ToastState>(null);

  constructor() {
    queueMicrotask(() => this.scrollService.registerSection(this.sectionRef.nativeElement, 'contact'));
  }

  ngOnDestroy(): void {
    if (this.toastTimer) {
      window.clearTimeout(this.toastTimer);
    }

    this.scrollService.unregisterSection(this.sectionRef.nativeElement);
  }

  async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (!environment.emailJs.serviceId || !environment.emailJs.templateId || !environment.emailJs.publicKey) {
      this.showToast('error', 'Add EmailJS credentials in environment.ts before sending messages.');
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
      this.showToast('success', 'Message sent successfully. I will get back to you soon.');
    } catch {
      this.showToast('error', 'Sending failed. Please try again after checking EmailJS credentials.');
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
      return `Minimum ${control.errors['minlength'].requiredLength} characters required.`;
    }

    return 'Invalid value.';
  }

  private showToast(type: 'success' | 'error', message: string): void {
    this.toast.set({ type, message });

    if (this.toastTimer) {
      window.clearTimeout(this.toastTimer);
    }

    this.toastTimer = window.setTimeout(() => this.toast.set(null), 4000);
  }
}