import { Component, ElementRef, OnInit, ViewChild, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './top-bar/top-bar.component'
import { Spell } from '../models/spell';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpellFormComponent } from './spell-form/spell-form.component';
import { SpellCardComponent } from './spell-card/spell-card.component';
import { AccordionComponent } from './accordion/accordion.component';
import { SpellCostants } from '../models/spells.costants';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TopBarComponent, ReactiveFormsModule, SpellFormComponent, SpellCardComponent, AccordionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  schools = SpellCostants.SCHOOLS;
  levels = SpellCostants.LEVELS;
  classes = SpellCostants.CLASSES;
  dndClassColors = SpellCostants.CLASS_COLORS;
  
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
    range: new FormControl<string>(''),
    class: new FormControl<string>('', Validators.required)
  });

  openAccordion: boolean = false

  @ViewChild('spellbook')
  spellbookRef!: ElementRef;

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  manageAddClick() {
    const newSpell: Spell = this.spellForm.value

    console.log('manageAddClick', newSpell);

    this.spellBookSignal.update(spellBook => spellBook.concat(newSpell).sort((a, b) => a.level - b.level))
    this.spellForm.reset();

    if(this.spellbookRef?.nativeElement) {
      (this.spellbookRef.nativeElement as HTMLElement).scrollIntoView();
    }
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
    if (divContents && printWindow) {
      printWindow.document.write(divContents);
    }
  }

  spellClick(spell: Spell, index: number) {
    console.log('clicked', spell, index);
  }

}
