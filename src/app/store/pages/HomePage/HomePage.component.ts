import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { NavbarComponent } from '../../../commons/components/Navbar/Navbar.component';
import { CarrouselComponent } from '../../components/Carrousel/Carrousel.component';
import { CategoryListComponent } from '../../components/Category-list/Category-list.component';
import { FooterComponent } from '../../../commons/components/Footer/Footer.component';
import { CartComponent } from '../../components/Cart/Cart.component';
import { ModalComponent } from '../../../commons/components/Modal/Modal.component';
import { SessionService } from '../../../login/services/session.service';

/**
 * @description
 * Componente de la página "Inicio".
 *
 * Este componente actúa como el punto de entrada principal de nuestra aplicación,
 * mostrando los productos y categorías más relevantes para el usuario.
 * Incluye elementos interactivos como un carrusel de imágenes, una lista de categorías,
 * una barra de navegación y un pie de página, proporcionando una experiencia de usuario completa y atractiva.
 */

@Component({
  selector: 'app-home-page',
  standalone: true,
  templateUrl: './HomePage.component.html',
  styleUrl: './HomePage.component.scss',
  imports: [
    CommonModule,
    NavbarComponent,
    CarrouselComponent,
    CategoryListComponent,
    FooterComponent,
    CartComponent,
    ModalComponent,
  ],
})
export class HomePageComponent implements OnInit, DoCheck {
  isModalOpen: boolean = false;
  modalMsg: string = '';
  isLogged: boolean = false;

  constructor(
    private sessionService: SessionService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.sessionService.isLogged$.subscribe((isLogged) => {
      this.isLogged = isLogged;
      this.cdr.markForCheck();
    });
    this.displayWelcomeMsg();
  }

  ngDoCheck(): void {
    if (this.isBrowser()) {
      if (localStorage.getItem('close_session')) {
        this.displayCloseSessionMsg();
      }
    }
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  displayWelcomeMsg() {
    if (this.isBrowser()) {
      if (localStorage.getItem('logged')) {
        const user = JSON.parse(localStorage.getItem('actual_user') ?? '');
        this.modalMsg = 'Bienvenido ' + user.name;
        this.isModalOpen = true;
        localStorage.removeItem('logged');
      }
    }
  }

  displayCloseSessionMsg() {
    if (this.isBrowser()) {
      if (!this.isLogged) {
        this.modalMsg = 'Has cerrado sesión. Hasta pronto';
        this.isModalOpen = true;
        localStorage.removeItem('close_session');
      }
    }
  }

  onModalClose() {
    this.isModalOpen = false;
  }

  onModalConfirm() {
    this.isModalOpen = false;
  }
}
