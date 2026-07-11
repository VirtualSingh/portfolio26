import { TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent],
    }).compileComponents();
  });

  function createComponent() {
    const fixture = TestBed.createComponent(ContactComponent);
    fixture.detectChanges();
    return { fixture, component: fixture.componentInstance };
  }

  it('marks all fields touched and does not submit an invalid form', async () => {
    const { component } = createComponent();

    await component.submit();

    expect(component.form.touched).toBe(true);
    expect(component.submitting()).toBe(false);
    expect(component.fieldError('name')).toBe('This field is required.');
    expect(component.fieldError('email')).toBe('This field is required.');
  });

  it('reports validation messages per error type', () => {
    const { component } = createComponent();

    component.form.controls.email.setValue('not-an-email');
    component.form.controls.email.markAsTouched();
    expect(component.fieldError('email')).toBe('Enter a valid email address.');

    component.form.controls.message.setValue('too short');
    component.form.controls.message.markAsTouched();
    expect(component.fieldError('message')).toContain('At least 20 characters');
  });

  it('shows the not-configured toast instead of sending when EmailJS keys are empty', async () => {
    const { component } = createComponent();

    component.form.setValue({
      name: 'Recruiter Jane',
      email: 'jane@example.com',
      subject: 'Frontend role',
      message: 'We would love to talk to you about an Angular position.',
    });

    await component.submit();

    expect(component.toast()?.type).toBe('error');
    expect(component.toast()?.message).toContain('not wired up');
  });
});
