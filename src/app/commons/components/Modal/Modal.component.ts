import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

/**
 * @description
 * Componente del "Modal".
 *
 * Este componente proporciona una ventana modal que se puede utilizar para mostrar mensajes,
 * confirmar acciones o solicitar información adicional del usuario. Incluye funcionalidades
 * para abrir y cerrar el modal, así como para manejar eventos de confirmación y cancelación.
 * Es altamente configurable y puede ser reutilizado en diferentes partes de la aplicación.
 */

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="modal-overlay" (click)="onClose()">
    <div class="modal-content" (click)="$event.stopPropagation()">
      <div class="modal-header">
        <h5 class="modal-title">{{ title }}</h5>
        <button type="button" class="close" (click)="onClose()">&times;</button>
      </div>
      <div class="modal-body">
        <ng-content></ng-content>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" (click)="onClose()">
          {{ closeButtonText }}
        </button>
        <button type="button" class="btn btn-primary" (click)="onConfirm()">
          {{ confirmButtonText }}
        </button>
      </div>
    </div>
  </div> `,
  styleUrl: './Modal.component.scss',
})
export class ModalComponent {
  @Input() title: string = '';
  @Input() closeButtonText: string = 'Close';
  @Input() confirmButtonText: string = 'Confirm';
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  onConfirm() {
    this.confirm.emit();
  }
}
