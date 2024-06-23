import { Injectable } from '@angular/core';
import { Product } from '../../../interfaces/interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Product[] = [];
  private isCartOpen = new BehaviorSubject<boolean>(false);
  private cartItemCount = new BehaviorSubject<number>(0);
  private cartTotal = new BehaviorSubject<number>(0);

  isCartOpen$ = this.isCartOpen.asObservable();
  cartItemCount$ = this.cartItemCount.asObservable();
  cartTotal$ = this.cartTotal.asObservable();

  constructor() {
    if (this.isBrowser()) {
      this.cart = this.loadCart();
      this.updateCartItemCount();
      this.updateCartTotal();
    }
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  loadCart(): Product[] {
    if (this.isBrowser()) {
      const storedCart = localStorage.getItem('cart');
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  }

  saveCart(): void {
    if (this.isBrowser()) {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
  }

  getCart(): Product[] {
    return this.cart;
  }

  addToCart(product: Product): void {
    const productIndex = this.cart.findIndex((p) => p.id === product.id);
    if (productIndex !== -1) {
      if (this.cart[productIndex].cantidad! < product.stock) {
        this.cart[productIndex].cantidad! += 1;
      } else {
        alert(`${product.name} no tiene stock suficiente`);
      }
    } else {
      this.cart.push({ ...product, cantidad: 1 });
    }
    this.saveCart();
    this.updateCartItemCount();
    this.updateCartTotal();
  }

  removeFromCart(productId: number): void {
    const productIndex = this.cart.findIndex((p) => p.id === productId);
    if (productIndex !== -1) {
      this.cart.splice(productIndex, 1);
      this.saveCart();
      this.updateCartItemCount();
      this.updateCartTotal();
    }
  }

  updateCartCount(): number {
    return this.cart.reduce(
      (total, product) => total + (product.cantidad || 0),
      0
    );
  }

  updateCartItems(): number {
    return this.cart.reduce(
      (total, product) => total + product.price * (product.cantidad || 1),
      0
    );
  }

  updateCartItemCount(): void {
    this.cartItemCount.next(this.updateCartCount());
  }

  updateCartTotal(): void {
    this.cartTotal.next(this.updateCartItems());
  }

  toggleCart(): void {
    this.isCartOpen.next(!this.isCartOpen.value);
  }

  openCart(): void {
    this.isCartOpen.next(true);
  }

  closeCart(): void {
    this.isCartOpen.next(false);
  }
}
