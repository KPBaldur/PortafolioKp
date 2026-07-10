import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { environment } from '../../../environments/environment';

declare var grecaptcha: any;

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css'],
    standalone: false
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  isSubmitting = false;
  submitMessage = '';
  showMessage = false;
  recaptchaSiteKey = environment.recaptcha?.siteKey || '';

  // Enlaces de redes sociales
  socialLinks = {
    linkedin: 'https://www.linkedin.com/in/kevin-pizarro',
    instagram: 'https://www.instagram.com/kevinp_ux_ui/',
    whatsapp: 'https://wa.me/56951648876' // Reemplaza con tu número real
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
    emailjs.init(environment.emailjs.publicKey);
  }

  private initializeForm(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    this.sendEmail();
  }

  // Método para enviar email usando EmailJS
  async sendEmail(): Promise<void> {
    if (this.contactForm.valid && !this.isSubmitting) {
      // Cooldown de 60 segundos para evitar spam local
      const lastSent = localStorage.getItem('last_email_sent');
      const now = Date.now();
      const cooldown = 60000; // 60 segundos

      if (lastSent && now - parseInt(lastSent, 10) < cooldown) {
        const remaining = Math.ceil((cooldown - (now - parseInt(lastSent, 10))) / 1000);
        this.submitMessage = `Por favor, espera ${remaining} segundos antes de enviar otro mensaje.`;
        this.showMessage = true;
        setTimeout(() => {
          this.submitMessage = '';
          this.showMessage = false;
        }, 5000);
        return;
      }

      this.isSubmitting = true;
      this.submitMessage = '';

      let recaptchaToken = '';
      if (this.recaptchaSiteKey) {
        try {
          if (typeof grecaptcha !== 'undefined') {
            recaptchaToken = grecaptcha.getResponse();
          }
        } catch (e) {
          console.error('Error al obtener respuesta de reCAPTCHA:', e);
        }

        if (!recaptchaToken) {
          this.submitMessage = 'Por favor, completa la verificación de reCAPTCHA.';
          this.showMessage = true;
          this.isSubmitting = false;
          return;
        }
      }

      try {
        // Preparar los parámetros del template
        const templateParams: Record<string, any> = {
          from_name: this.contactForm.get('name')?.value,
          from_email: this.contactForm.get('email')?.value,
          subject: this.contactForm.get('subject')?.value,
          message: this.contactForm.get('message')?.value,
          to_name: 'Kevin Pizarro', // Reemplaza con tu nombre
        };

        if (recaptchaToken) {
          templateParams['g-recaptcha-response'] = recaptchaToken;
        }

        // Enviar email usando EmailJS
        const response = await emailjs.send(
          environment.emailjs.serviceId,
          environment.emailjs.templateId,
          templateParams
        );

        console.log('Email enviado exitosamente:', response);
        this.submitMessage = '¡Mensaje enviado exitosamente! Te contactaré pronto.';
        this.contactForm.reset();
        
        // Reiniciar el widget de reCAPTCHA
        if (recaptchaToken && typeof grecaptcha !== 'undefined') {
          grecaptcha.reset();
        }

        // Registrar marca de tiempo del último envío exitoso
        localStorage.setItem('last_email_sent', Date.now().toString());
        
      } catch (error) {
        console.error('Error al enviar email:', error);
        this.submitMessage = 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.';
      } finally {
        this.isSubmitting = false;
        this.showMessage = true;
        
        // Limpiar mensaje después de 5 segundos
        setTimeout(() => {
          this.submitMessage = '';
          this.showMessage = false;
        }, 5000);
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.contactForm.controls).forEach(key => {
      const control = this.contactForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    
    if (field?.hasError('required')) {
      return `${this.getFieldLabel(fieldName)} es requerido.`;
    }
    
    if (field?.hasError('email')) {
      return 'Por favor, ingresa un email válido.';
    }
    
    if (field?.hasError('minlength')) {
      const requiredLength = field.errors?.['minlength']?.requiredLength;
      return `${this.getFieldLabel(fieldName)} debe tener al menos ${requiredLength} caracteres.`;
    }
    
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      name: 'Nombre',
      email: 'Email',
      subject: 'Asunto',
      message: 'Mensaje'
    };
    return labels[fieldName] || fieldName;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }

  onSocialClick(platform: string): void {
    // Analytics o tracking opcional
    console.log(`Clicked on ${platform}`);
  }
}