import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopBarComponent {
  @Input() enableNew: boolean = true;
  @Input() enableEdit: boolean = true;
  @Input() enableDelete: boolean = true;

  @Input() enableImport: boolean = true;
  @Input() enableExport: boolean = true;

  @Output() addClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @Output() editClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @Output() deleteClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  @Output() importClick: EventEmitter<File> = new EventEmitter<File>();
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
  fileChanged(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0] as File;
    if (file) {
      this.importClick.emit(file);
    }
  }

}
