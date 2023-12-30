import { Component, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './top-bar/top-bar.component'
import { Spell } from '../models/spell';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpellFormComponent } from './spell-form/spell-form.component';
import { SpellCardComponent } from './spell-card/spell-card.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TopBarComponent, ReactiveFormsModule, SpellFormComponent, SpellCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  readonly schools = [
    'Abjuration',
    'Enchantment',
    'Necromancy',
    'Divination',
    'Illusion',
    'Conjuration',
    'Evocation',
    'Transmutation',
    'War Magic'
  ];
  readonly levels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  spellBookSignal: WritableSignal<Spell[]> = signal([]);

  spellForm: FormGroup = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    level: new FormControl<number>(0),
    school: new FormControl<string>('', Validators.required),
    castingTime: new FormControl<string>(''),
    duration: new FormControl<string>(''),
    components: new FormControl<string>(''),
    description: new FormControl<string>('', Validators.required),
    atHigherLevels: new FormControl<string>(''),
    source: new FormControl<string>(''),
    isRitual: new FormControl<boolean>(false),
    requiresConcentration: new FormControl<boolean>(false),
  });

  manageAddClick() {
    const newSpell: Spell = this.spellForm.value

    console.log('manageAddClick', newSpell);

    this.spellBookSignal.update(spellBook => spellBook.concat(newSpell).sort((a, b) => a.level - b.level))

  }

  manageEditClick() {
    console.log('manageEditClick');
  }

  manageImportClick() {
    console.log('manageImportClick');
  }

  manageExportClick() {
    console.log('manageExportClick');
  }

  printSpellBook() {
    //https://stackoverflow.com/questions/58972025/export-html-page-to-pdf-in-angular
    const divContents = document.getElementById('printHere')?.innerHTML;
    const printWindow = window.open('', '', 'height=400,width=800');
    console.log(divContents);
    if(divContents && printWindow) {
      printWindow.document.write(divContents);
    }
  }

  spellClick(spell: Spell, index: number) {
    console.log('clicked', spell, index);
  }
}
