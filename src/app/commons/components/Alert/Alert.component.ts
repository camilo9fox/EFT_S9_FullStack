import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/**
 * @description
 * Componente de "Alert".
 *
 * Este componente proporciona una ventana de alerta para mostrar mensajes importantes al usuario.
 * Puede ser utilizado para mostrar notificaciones, advertencias, errores o información general.
 * Incluye opciones para personalizar el mensaje, el tipo de alerta (éxito, advertencia, error, información)
 * y funcionalidades para cerrar la alerta.
 */

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  template: ` <div [classList]="'alert ' + 'alert-' + alertType" role="alert">
    {{ alertMsg }}
  </div>`,
  styleUrl: './Alert.component.scss',
})
export class AlertComponent {
  @Input() alertMsg: string = '';
  @Input() alertType: string = 'danger';
}
