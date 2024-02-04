import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopBarComponent {
  @Input() enableNew: boolean = true;
  @Input() enableEdit: boolean = false;
  @Input() enableDelete: boolean = false;

  @Input() enableImport: boolean = false;
  @Input() enableExport: boolean = false;

  @Output() addClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @Output() editClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @Output() deleteClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  @Output() importClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @Output() exportClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  manageButtonClick(eventType: 'ADD' | 'EDIT' | 'DELETE' | 'IMPORT' | 'EXPORT') {
    console.log('manageButtonClick', eventType);
    switch (eventType) {
      case 'ADD':
        this.addClick.emit();
        break;
      case 'EDIT':
        this.editClick.emit();
        break;
      case 'DELETE':
        this.deleteClick.emit();
        break;
      case 'IMPORT':
        this.importClick.emit();
        break;
      case 'EXPORT':
        this.exportClick.emit();
        break;
    }
  }
}
