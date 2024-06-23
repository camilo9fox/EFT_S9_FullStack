import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../../../commons/components/Footer/Footer.component';
import { NameComponent } from '../../components/Cart/Cart.component';
import { NavbarComponent } from '../../../commons/components/Navbar/Navbar.component';

/**
 * @description
 * Componente de la página "Mi Perfil".
 *
 * Este componente corresponde al perfil del usuario en donde podra
 * visualizar su información personal con la posibilidad de editar
 * dicha información.
 */

@Component({
  selector: 'app-my-profile-page',
  standalone: true,
  templateUrl: './MyProfilePage.component.html',
  styleUrls: ['./MyProfilePage.component.scss'],
  imports: [
    CommonModule,
    FooterComponent,
    NameComponent,
    NavbarComponent,
    FormsModule,
  ],
})
export class MyProfilePageComponent implements OnInit {
  user = {
    name: '',
    lastName: '',
    address: '',
  };

  ngOnInit(): void {
    this.loadUserData();
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  loadUserData(): void {
    if (this.isBrowser()) {
      const actualUser = localStorage.getItem('actual_user');
      if (actualUser) {
        this.user = JSON.parse(actualUser);
      }
    }
  }

  handleChangeDataProfile(data: any): void {
    if (this.isBrowser()) {
      let actualUser = JSON.parse(localStorage.getItem('actual_user') ?? '{}');
      let registeredUsers = localStorage.getItem('registered-users')
        ? JSON.parse(localStorage.getItem('registered-users') ?? '[]')
        : [];

      actualUser.name = data.name;
      actualUser.lastName = data.lastName;
      actualUser.address = data.address;
      localStorage.setItem('actual_user', JSON.stringify(actualUser));

      registeredUsers = registeredUsers.map((user: any) => {
        if (user.email === actualUser.email) {
          user.name = data.name;
          user.lastName = data.lastName;
          user.address = data.address;
        }
        return user;
      });
      localStorage.setItem('registered-users', JSON.stringify(registeredUsers));
    }
  }

  validateData(data: any): boolean {
    const validations = [
      {
        condition: data.name === '' || data.name.length < 3,
        message:
          'El nombre no debe estar vacío y debe tener un mínimo de 3 caracteres.',
      },
      {
        condition: data.lastName === '' || data.lastName.length < 3,
        message:
          'El apellido no debe estar vacío y debe tener un mínimo de 3 caracteres.',
      },
      {
        condition: data.address === '' || data.address.length < 10,
        message:
          'La dirección no debe estar vacía y debe tener un mínimo de 10 caracteres.',
      },
    ];

    for (let validation of validations) {
      if (validation.condition) {
        alert(validation.message);
        return false;
      }
    }

    return true;
  }

  onSubmit(): void {
    if (this.validateData(this.user)) {
      this.handleChangeDataProfile(this.user);
      alert('Perfil modificado con éxito');
    }
  }
}
