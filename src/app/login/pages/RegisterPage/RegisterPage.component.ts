import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ModalComponent } from '../../../commons/components/Modal/Modal.component';

/**
 * @description
 * Componente de la página "Registro".
 *
 * Este componente permite a los nuevos usuarios crear una cuenta en la plataforma.
 * Proporciona un formulario de registro donde los usuarios pueden ingresar la información
 * requerida, como nombre, correo electrónico y contraseña, entre otros. Incluye validaciones para asegurar
 * que los campos sean completados correctamente y maneja los errores de registro, mostrando
 * mensajes apropiados al usuario.
 */

@Component({
  selector: 'app-register-page',
  standalone: true,
  templateUrl: './RegisterPage.component.html',
  styleUrl: './RegisterPage.component.scss',
  imports: [CommonModule, ReactiveFormsModule, ModalComponent],
})
export class RegisterPageComponent implements OnInit {
  registerForm: FormGroup;
  isModalOpen = false;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        lastName: ['', [Validators.required, Validators.minLength(3)]],
        address: ['', [Validators.required, Validators.minLength(10)]],
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            this.validateEmail.bind(this),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(20),
            this.validatePassword(),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordsMatch }
    );
  }

  ngOnInit(): void {}

  openModal() {
    this.isModalOpen = true;
  }

  onModalClose() {
    this.isModalOpen = false;
    console.log('Modal cerrado');
  }

  onModalConfirm() {
    this.isModalOpen = false;
    console.log('Modal confirmado');
  }

  validatePassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const specialCharRegex = /[!@#$%^&*]/;
      const numberRegex = /[0-9]/;
      const letterRegex = /[a-zA-Z]/;

      if (!specialCharRegex.test(value)) {
        return { specialChar: true };
      }

      if (!numberRegex.test(value)) {
        return { number: true };
      }

      if (!letterRegex.test(value)) {
        return { letter: true };
      }

      return null;
    };
  }

  validateEmail(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return { emailInvalid: true };
    }
    const registeredUsers = JSON.parse(
      localStorage.getItem('registered-users') || '[]'
    );
    if (registeredUsers.map((user: any) => user.email).includes(value)) {
      return { emailTaken: true };
    }
    return null;
  }

  passwordsMatch(formGroup: AbstractControl): ValidationErrors | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const user = this.registerForm.value;
      const registeredUsers = JSON.parse(
        localStorage.getItem('registered-users') ?? '[]'
      );
      registeredUsers.push({ ...user, type: 'customer' });
      localStorage.setItem('registered-users', JSON.stringify(registeredUsers));
      this.cleanFormFields();
      this.openModal();
    }
  }

  cleanFormFields(): void {
    this.registerForm.reset();
  }
}
