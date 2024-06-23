import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * @description
 * Componente del "Footer".
 *
 * Este componente proporciona el pie de página de la plataforma.
 * Muestra el nombre de la página y un mensaje de "Todos los derechos reservados".
 */

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `<footer class="container-fluid primary-bg-color p-5">
    <h5 class="text-center lead">
      Pepe Libreria - Todos los derechos reservados © 2024
    </h5>
  </footer> `,
  styleUrl: './Footer.component.css',
})
export class FooterComponent {}
