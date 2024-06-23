import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FooterComponent } from '../../../commons/components/Footer/Footer.component';
import { NameComponent } from '../../components/Cart/Cart.component';
import { NavbarComponent } from '../../../commons/components/Navbar/Navbar.component';
import { CartService } from '../../services/CartService.service';
import { Product } from '../../../../interfaces/interfaces';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from '../../../commons/components/Alert/Alert.component';

/**
 * @description
 * Componente de la página "Tienda".
 *
 * Este componente muestra los productos disponibles en la tienda y cuenta con un apartado
 * de filtros que permite al usuario realizar una búsqueda más específica de los productos.
 */

@Component({
  selector: 'app-store-page',
  standalone: true,
  templateUrl: './StorePage.component.html',
  styleUrl: './StorePage.component.scss',
  imports: [
    CommonModule,
    FooterComponent,
    NameComponent,
    NavbarComponent,
    FormsModule,
    AlertComponent,
  ],
})
export class StorePageComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  allProducts = [
    {
      id: 1,
      description:
        'Una novela distópica que explora los peligros del totalitarismo y la vigilancia gubernamental.',
      name: '1984',
      stock: 10,
      author: 'George Orwell',
      category: 'Social politico',
      price: 37000,
      image: './assets/img/libros/1984.webp',
    },
    {
      id: 2,
      description:
        'Un manifiesto político que presenta los principios del comunismo y la lucha de clases.',
      name: 'Manifiesto Comunista',
      author: 'Karl Marx',
      stock: 5,
      category: 'Social politico',
      price: 22000,
      image: './assets/img/libros/manifiesto-comunista.webp',
    },
    {
      id: 3,
      description:
        'Un libro pionero en el movimiento ambientalista que destaca los efectos perjudiciales de los pesticidas.',
      name: 'Primavera Silenciosa',
      author: 'Rachel Carson',
      stock: 3,
      category: 'Social politico',
      price: 10000,
      image: './assets/img/libros/primavera-silenciosa.webp',
    },
    {
      id: 4,
      description:
        'Una novela que combina misterio y romance en la Barcelona de posguerra.',
      name: 'La Sombra del Viento',
      author: 'Carlos Ruiz Zafón',
      stock: 1,
      category: 'Literatura',
      price: 50000,
      image: './assets/img/libros/la-sombra-del-viento.webp',
    },
    {
      id: 5,
      description:
        'Una novela mágica sobre un circo itinerante que solo aparece de noche y los dos jóvenes magos atrapados en una competencia.',
      name: 'El Circo de la Noche',
      author: 'Erin Morgenstern',
      stock: 7,
      category: 'Literatura',
      price: 25000,
      image: './assets/img/libros/circo-de-la-noche.webp',
    },
    {
      id: 6,
      description:
        'La historia de un joven náufrago que sobrevive en el océano Pacífico acompañado por un tigre de Bengala.',
      name: 'La Vida de Pi',
      author: 'Yann Martel',
      stock: 55,
      category: 'Literatura',
      price: 6000,
      image: './assets/img/libros/vida-de-pi.webp',
    },
    {
      id: 7,
      description:
        'Un clásico de la literatura infantil que narra las aventuras de un pequeño príncipe que viaja de planeta en planeta.',
      name: 'El Principito',
      author: 'Antoine de Saint-Exupéry',
      stock: 100,
      category: 'Infantil',
      price: 20000,
      image: './assets/img/libros/el-principito.webp',
    },
    {
      id: 8,
      description:
        'La historia de una niña prodigio que usa sus poderes para superar las dificultades de su vida.',
      name: 'Matilda',
      author: 'Roald Dahl',
      stock: 0,
      category: 'Infantil',
      price: 15000,
      image: './assets/img/libros/matilda.webp',
    },
  ];

  filteredProducts: Product[] = [...this.allProducts];

  filters = {
    name: '',
    author: '',
    category: '',
  };

  filterProduct = () => {
    this.filteredProducts = this.allProducts.filter((product) => {
      return (
        (this.filters.category === '' ||
          product.category === this.filters.category) &&
        (this.filters.name === '' ||
          product.name
            .toLowerCase()
            .includes(this.filters.name.toLowerCase())) &&
        (this.filters.author === '' ||
          product.author
            .toLowerCase()
            .includes(this.filters.author.toLowerCase()))
      );
    });
    setTimeout(() => {
      if (this.filteredProducts.length === 0) {
        this.filteredProducts = [...this.allProducts];
        this.filters = {
          name: '',
          author: '',
          category: '',
        };
      }
      this.cdr.detectChanges();
    }, 1500);
  };

  addProduct = (product: Product) => {
    this.cartService.addToCart(product);
  };
}
