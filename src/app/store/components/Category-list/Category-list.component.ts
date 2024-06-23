import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

/**
 * @description
 * Componente de la página "Lista de categorías".
 *
 * Este componente reúne y muestra las categorías de productos disponibles en la tienda.
 */

@Component({
  selector: 'app-category-list',
  templateUrl: `./Category-list.component.html`,
  styleUrl: './Category-list.component.scss',
  standalone: true,
  imports: [CommonModule],
})
export class CategoryListComponent {
  categorias = [
    {
      imgSrc: './assets/img/categorias/politico.webp',
      title: 'Social politico',
    },
    { imgSrc: './assets/img/categorias/infantil.webp', title: 'Infantil' },
    { imgSrc: './assets/img/categorias/literatura.webp', title: 'Literatura' },
    { imgSrc: './assets/img/categorias/religion.webp', title: 'Religión' },
    { imgSrc: './assets/img/categorias/deporte.webp', title: 'Deporte' },
    { imgSrc: './assets/img/categorias/negocios.webp', title: 'Negocios' },
  ];
}
