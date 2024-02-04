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
  @Input() enableImportExport: boolean = false;
  
  @Output() addClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @Output() editClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @Output() importClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @Output() exportClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  manageButtonClick(eventType: 'ADD' | 'EDIT' | 'IMPORT' | 'EXPORT') {
    console.log('manageButtonClick', eventType);
    switch (eventType) {
      case 'ADD':
        this.addClick.emit();
        break;
      case 'EDIT':
        this.editClick.emit();
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
