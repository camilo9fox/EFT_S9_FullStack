import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FooterComponent } from '../../../commons/components/Footer/Footer.component';
import { CartComponent } from '../../components/Cart/Cart.component';
import { NavbarComponent } from '../../../commons/components/Navbar/Navbar.component';
import { CartService } from '../../services/CartService.service';
import { Product } from '../../../../interfaces/interfaces';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from '../../../commons/components/Alert/Alert.component';
import { ProductService } from '../../services/Product.service';
import { HttpClientModule } from '@angular/common/http';

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
    CartComponent,
    NavbarComponent,
    FormsModule,
    AlertComponent,
    HttpClientModule,
  ],
  providers: [ProductService],
})
export class StorePageComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private cdr: ChangeDetectorRef,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productService.getProductsData().subscribe((data: Product[]) => {
      this.allProducts = data;
      this.filteredProducts = data;
    });
  }

  allProducts: Product[] = [];

  filteredProducts: Product[] = [];

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
