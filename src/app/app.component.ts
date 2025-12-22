import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReplaceCharactersDirective } from './directives/replace-characters.directive';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReplaceCharactersDirective,CommonModule,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public  registrationForm: FormGroup;
  private readonly  _fb =  inject(FormBuilder);
  constructor() {
    this.registrationForm = this._fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      documentNumber: ['', [Validators.required, Validators.minLength(6)]],
      username: ['', [Validators.required, Validators.minLength(3)]]
    });
  }


   isFieldInvalid(fieldName: string): boolean {
    const field = this.registrationForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      console.log('Formulario enviado:', this.registrationForm.value);
      alert('¡Registro exitoso! Revisa la consola para ver los datos.');
    }
  }

  onReset(): void {
    this.registrationForm.reset();
  }
}
