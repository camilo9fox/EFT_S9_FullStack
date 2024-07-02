import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CartService } from '../../../store/services/CartService.service';
import { SessionService } from '../../../login/services/session.service';
import { ModalComponent } from '../Modal/Modal.component';
import { Router } from '@angular/router';

/**
 * @description
 * Componente de la barra de navegación ("Navbar").
 *
 * Este componente proporciona la barra de navegación principal para la plataforma.
 * Incluye enlaces a las diferentes secciones del sitio web, como la página de inicio,
 * tienda, carrito de compras, y secciones de autenticación (inicio de sesión y registro).
 * También puede mostrar el estado de la sesión del usuario, permitiendo acceso rápido
 * a la información de la cuenta y opciones de cierre de sesión.
 */

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './Navbar.component.html',
  styleUrl: './Navbar.component.scss',
  imports: [CommonModule, ModalComponent],
})
export class NavbarComponent implements OnInit {
  cartItemCount = 0;
  isLogged: boolean = false;
  isModalOpen: boolean = false;
  isLoggedUserAdmin: boolean = false;

  constructor(
    private cartService: CartService,
    private sessionService: SessionService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getStatusLogin();
    this.getUserType();
    this.cartService.cartItemCount$.subscribe((count) => {
      this.cartItemCount = count;
      this.cdr.markForCheck();
    });
    this.sessionService.isLogged$.subscribe((isLogged) => {
      this.isLogged = isLogged;
      this.cdr.markForCheck();
    });
    this.sessionService.isAdmin$.subscribe((isAdmin) => {
      this.isLoggedUserAdmin = isAdmin;
      this.cdr.markForCheck();
    });
  }

  openCart(): void {
    this.cartService.openCart();
  }

  getStatusLogin() {
    this.sessionService.getStatusLogin();
  }

  getUserType() {
    this.sessionService.getUserType();
  }

  onCloseSession() {
    this.sessionService.closeSession();
    this.router.navigate(['/']);
  }
}
