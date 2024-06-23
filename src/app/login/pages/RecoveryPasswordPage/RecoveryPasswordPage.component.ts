import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * @description
 * Componente de la página "Recuperar contraseña".
 *
 * Este componente permite a los usuarios recuperar el acceso a sus cuentas en caso de olvidar su contraseña.
 * Proporciona un formulario donde los usuarios pueden ingresar su dirección de correo electrónico asociada
 * a la cuenta. Incluye validaciones para asegurar que el campo sea completado correctamente y maneja
 * el proceso de envío de un enlace de restablecimiento de contraseña, mostrando mensajes apropiados al usuario.
 */

@Component({
  selector: 'app-recovery-password-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './RecoveryPasswordPage.component.html',
  styleUrl: './RecoveryPasswordPage.component.scss',
})
export class RecoveryPasswordPageComponent {}
