import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Spell } from '../../../models/spell';
import { CommonModule } from '@angular/common';
import { DiceBoldPipePipe } from "../../shared/pipes/dice-bold-pipe.pipe";

@Component({
  selector: 'app-spell-card',
  standalone: true,
  templateUrl: './spell-card.component.html',
  styleUrl: './spell-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, DiceBoldPipePipe]
})
export class SpellCardComponent {
  @Input() spell!: Spell;
  @Input() width: number = 300;
  @Input() height: number = 500;
  @Input() htmlColour: string = '';

  formatSpellLevel(level: number): string {
    const levelStringMap = [
      'Cantrip', 'First', 'Second', 'Third',
      'Fourth', 'Fifth', 'Sixth', 'Seventh',
      'Eighth', 'Ninth', 'Tenth', 'Eleventh'
    ];

    return `${levelStringMap[level] ? levelStringMap[level] : level} level`;
  }

  calculateFontSize() {
    let charNumber =
      (this.spell.description?.length || 0) +
      (this.spell.atHigherLevels?.length || 0);
    if (charNumber < 200) {
      charNumber = 200;
    }
    if (charNumber >= 1000) {
      return 15 - charNumber / 140;
    }

    //Viva i magic numbers
    return 15 - charNumber / 120;
  }
}
