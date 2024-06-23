import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CartService } from '../../services/CartService.service';
import { Product } from '../../../../interfaces/interfaces';

/**
 * @description
 * Componente de la página "Pedido".
 *
 * Este componente permite al usuario finalizar la compra de los productos del carrito de compras.
 * Aquí, el usuario puede revisar la información de su pedido, completar el formulario y proporcionar
 * los datos necesarios para proceder con la compra de los productos.
 */

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './Order.component.html',
  styleUrls: ['./Order.component.scss'],
})
export class OrderComponent implements OnInit {
  user = {
    rut: '',
    name: '',
    last_name: '',
    region: '',
    city: '',
    address: '',
    phone: '',
    email: '',
  };

  cart: Product[] = [];
  total = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.total = this.cartService.updateCartItems();
    this.cartService.cartTotal$.subscribe((total) => {
      this.total = total;
    });
  }

  validateData(data: any): boolean {
    const validations = [
      {
        condition: data.rut === '' || data.rut.length < 9,
        message: 'El rut debe tener una longitud mínima de 9 caracteres.',
      },
      {
        condition: data.name === '' || data.name.length < 3,
        message:
          'El nombre no debe estar vacío y debe tener un mínimo de 3 caracteres.',
      },
      {
        condition: data.last_name === '' || data.last_name.length < 3,
        message:
          'El apellido no debe estar vacío y debe tener un mínimo de 3 caracteres.',
      },
      {
        condition: data.region === '',
        message: 'Debe seleccionar una región',
      },
      {
        condition: data.city === '',
        message: 'Debe seleccionar una ciudad',
      },
      {
        condition: data.address === '' || data.address.length < 10,
        message:
          'La dirección no debe estar vacía y debe tener un mínimo de 10 caracteres.',
      },
      {
        condition: !/^\d+$/.test(data.phone),
        message: 'El teléfono solo debe contener números.',
      },
    ];

    const validateEmail = (email: string): string => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return 'El correo electrónico no es válido.';
      }
      return '';
    };

    for (let validation of validations) {
      if (validation.condition) {
        alert(validation.message);
        return false;
      }
    }

    const emailValidationMessage = validateEmail(data.email);
    if (emailValidationMessage) {
      alert(emailValidationMessage);
      return false;
    }

    return true;
  }

  onSubmit(form: NgForm): void {
    const formDetails = form.value;
    if (this.validateData(formDetails)) {
      alert('Compra realizada');
    }
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.cart = this.cartService.getCart();
    this.total = this.cartService.updateCartItems();
  }
}
