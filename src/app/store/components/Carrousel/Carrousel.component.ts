import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * @description
 * Componente de la página "Carrusel de imágenes".
 *
 * Este componente agrupa imágenes y las muestra de una en una, permitiendo
 * al usuario avanzar y retroceder entre las imágenes disponibles.
 */

@Component({
  selector: 'app-carrousel',
  standalone: true,
  imports: [CommonModule],
  template: `<div id="carousel-portada" class="carousel slide">
    <div class="carousel-indicators">
      <button
        *ngFor="let image of images; let i = index"
        type="button"
        [attr.data-bs-target]="'#carousel-portada'"
        [attr.data-bs-slide-to]="i"
        [class.active]="i === 0"
        [attr.aria-current]="i === 0 ? 'true' : null"
        [attr.aria-label]="'Slide ' + (i + 1)"
      ></button>
    </div>
    <div class="carousel-inner">
      <div
        *ngFor="let image of images; let i = index"
        class="carousel-item"
        [class.active]="i === 0"
      >
        <img [src]="image" class="d-block w-100" alt="Slide image" />
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carousel-portada"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carousel-portada"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div> `,
  styleUrl: './Carrousel.component.scss',
})
export class CarrouselComponent {
  images = [
    './assets/img/carrusel/1.webp',
    './assets/img/carrusel/2.webp',
    './assets/img/carrusel/3.webp',
  ];
}
