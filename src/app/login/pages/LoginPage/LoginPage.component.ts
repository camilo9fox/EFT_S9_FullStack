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
import { UsersService } from '../../services/users.service';
import { HttpClientModule } from '@angular/common/http';
import { User } from '../../../../interfaces/interfaces';

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
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModalComponent,
    HttpClientModule,
  ],
  providers: [UsersService],
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  isOpenModal: boolean = false;
  users: User[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usersService: UsersService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.usersService.getUsersData().subscribe((data) => {
      this.users = data;
      console.log({ data });
    });
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined';
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
