import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CartService } from '../../services/CartService.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../../../interfaces/interfaces';

/**
 * @description
 * Componente de la página "Carro de compras".
 *
 * Este componente está disponible de forma transversal en la plataforma,
 * permitiendo agrupar y visualizar productos para su posterior compra.
 */

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'Cart.component.html',
  styleUrl: 'Cart.component.scss',
})
export class CartComponent implements OnInit {
  cart: Product[] = [];
  total = 0;
  isOpen = false;

  constructor(
    private cartService: CartService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cart = this.cartService.getCart();
    this.total = this.cartService.updateCartItems();

    this.cartService.isCartOpen$.subscribe((isOpen) => {
      this.isOpen = isOpen;
      this.cdr.markForCheck();
    });

    this.cartService.cartTotal$.subscribe((total) => {
      this.total = total;
      this.cdr.markForCheck();
    });
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.cart = this.cartService.getCart();
    this.total = this.cartService.updateCartItems();
    this.cdr.markForCheck();
  }

  toggleCart(): void {
    this.cartService.toggleCart();
  }
}
