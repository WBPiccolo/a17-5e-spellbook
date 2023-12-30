import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Spell } from '../../models/spell';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spell-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spell-card.component.html',
  styleUrl: './spell-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpellCardComponent {
  @Input() spell!: Spell;
  @Input() width: number = 300;
  @Input() height: number = 500;
  @Input() colourMap: Map<string, string> = new Map([]);  
}
