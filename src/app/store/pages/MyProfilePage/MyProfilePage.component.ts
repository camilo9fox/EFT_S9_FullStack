import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../../../commons/components/Footer/Footer.component';
import { CartComponent } from '../../components/Cart/Cart.component';
import { NavbarComponent } from '../../../commons/components/Navbar/Navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { UsersService } from '../../../login/services/users.service';
import { User } from '../../../../interfaces/interfaces';

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
    CartComponent,
    NavbarComponent,
    FormsModule,
    HttpClientModule,
  ],
  providers: [UsersService],
})
export class MyProfilePageComponent implements OnInit {
  loggedUser = {
    name: '',
    lastName: '',
    address: '',
  };
  users: User[] = [];

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.getUsersData().subscribe((data) => {
      this.users = data;
      console.log({ data });
    });
    this.loadLoggedUserData();
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  loadLoggedUserData(): void {
    if (this.isBrowser()) {
      const actualUser = localStorage.getItem('actual_user');
      if (actualUser) {
        const emailLoggedUser = JSON.parse(actualUser).email;
        const findedUser = this.users.find(
          (user: User) => user.email === emailLoggedUser
        )!;
        this.loggedUser = findedUser;
      }
    }
  }

  updateLoggedUserData(user: User) {
    if (this.isBrowser()) {
      localStorage.getItem(JSON.stringify(user));
    }
  }

  handleChangeDataProfile(data: any): void {
    if (this.isBrowser()) {
      let actualUser = JSON.parse(localStorage.getItem('actual_user') ?? '{}');

      this.users.map((user: any) => {
        if (user.email === actualUser.email) {
          user.name = data.name;
          user.lastName = data.lastName;
          user.address = data.address;
          this.updateLoggedUserData(user);
        }
        return user;
      });

      this.usersService.updateUsersJson(this.users);
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
    if (this.validateData(this.loggedUser)) {
      this.handleChangeDataProfile(this.loggedUser);
      alert('Perfil modificado con éxito');
    }
  }
}
