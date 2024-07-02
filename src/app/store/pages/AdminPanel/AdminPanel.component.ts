import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../commons/components/Navbar/Navbar.component';
import { FooterComponent } from '../../../commons/components/Footer/Footer.component';
import { CartComponent } from '../../components/Cart/Cart.component';
import { User } from '../../../../interfaces/interfaces';
import { UsersService } from '../../../login/services/users.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
    CartComponent,
    HttpClientModule,
  ],
  templateUrl: './AdminPanel.component.html',
  styleUrl: './AdminPanel.component.scss',
  providers: [UsersService],
})
export class AdminPanelComponent implements OnInit {
  customerUsers: User[] = [];
  allUsers: User[] = [];

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.getUsersData().subscribe((data) => {
      this.customerUsers = data.filter((user: User) => user.type !== 'admin');
      this.allUsers = data;
    });
  }

  onDeleteUser(email: string) {
    this.allUsers = this.allUsers.filter((user: User) => user.email !== email);
    this.customerUsers = this.customerUsers.filter(
      (user: User) => user.email !== email
    );
    this.usersService.updateUsersJson(this.allUsers);
  }
}
