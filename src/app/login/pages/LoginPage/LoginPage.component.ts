import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ModalComponent } from '../../../commons/components/Modal/Modal.component';

/**
 * @description
 * Componente de la página "Inicio de sesión".
 *
 * Este componente permite a los usuarios autenticarse en la plataforma.
 * Proporciona un formulario donde los usuarios pueden ingresar sus credenciales
 * (nombre de usuario y contraseña) para acceder a sus cuentas. Incluye validaciones
 * para asegurar que los campos sean completados correctamente y maneja los errores
 * de autenticación, mostrando mensajes apropiados al usuario.
 */

@Component({
  selector: 'app-login-page',
  standalone: true,
  templateUrl: './LoginPage.component.html',
  styleUrl: './LoginPage.component.scss',
  imports: [CommonModule, ReactiveFormsModule, ModalComponent],
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  isOpenModal: boolean = false;
  users = [
    {
      email: 'camiloacunacz@gmail.com',
      password: '123',
      type: 'admin',
      name: 'Camilo',
      lastName: 'Acuña',
      address: 'Providencia 123, Santiago, RM',
    },
    {
      email: 'camil.acunac@duocuc.cl',
      password: '321',
      type: 'customer',
      name: 'Pepe',
      lastName: 'The Frog',
      address: 'Arauco 24, Valdivia, Los Rios',
    },
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadRegisteredUsers();
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  loadRegisteredUsers(): void {
    if (this.isBrowser()) {
      const registeredUsers = localStorage.getItem('registered-users');
      if (registeredUsers) {
        JSON.parse(registeredUsers).forEach((user: any) => {
          this.users.push(user);
        });
      }
    }
  }

  onSubmit(): void {
    if (this.isBrowser()) {
      if (this.loginForm.valid) {
        const formDetails = this.loginForm.value;
        let isValidUser = false;
        this.users.forEach((user) => {
          if (
            user.email === formDetails.email &&
            user.password === formDetails.password
          ) {
            localStorage.setItem('actual_user', JSON.stringify(user));
            localStorage.setItem('logged', 'true');
            isValidUser = true;
          }
        });
        if (isValidUser) {
          this.router.navigate(['/']);
        } else {
          this.openModal();
        }
      }
    }
  }

  openModal() {
    this.isOpenModal = true;
  }

  onModalClose() {
    this.isOpenModal = false;
  }

  onModalConfirm() {
    this.isOpenModal = false;
  }
}
