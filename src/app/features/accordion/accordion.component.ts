import { animate, group, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss',
  animations: [
    trigger('slideInOut', [
      state('open', style({
        height: '*',
        opacity: 1,
      })),
      state('closed', style({
        height: '0',
        opacity: 0,
        overflow: 'hidden',
      })),
      transition('open <=> closed', [
        animate('300ms ease-in-out'),
      ]),
    ]),
  ],
})
export class AccordionComponent {
  @Input() isOpen: boolean = false
  @Input() header: string = 'accordion header';
  @Input() openHeader: string = this.header;
  @Input() closeHeader: string = this.header;

  @Output() accordionOpened: EventEmitter<boolean> = new EventEmitter<boolean>();

  toggle() {
    this.isOpen = !this.isOpen;
    this.accordionOpened.emit(this.isOpen)
  }

}
//https://angular.io/guide/animations#prerequisites