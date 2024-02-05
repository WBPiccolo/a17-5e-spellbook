import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './features/top-bar/top-bar.component';
import { Spell } from '../models/spell';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpellFormComponent } from './features/spell-form/spell-form.component';
import { SpellCardComponent } from './features/spell-card/spell-card.component';
import { AccordionComponent } from './features/accordion/accordion.component';
import { SpellCostants } from '../models/spells.costants';
import { SpellBookService } from './shared/services/spell-book.service';
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
    class: new FormControl<string>('', Validators.required),
    spellID: new FormControl<number>(-1)
  });

  openAccordion: boolean = false;
  editMode: boolean = false;

  @ViewChild('spellbook') spellbookRef!: ElementRef;

  @ViewChild('accordion') accordionRef!: ElementRef;

  constructor(
    public spellbookService: SpellBookService
    ) { }

  ngOnInit(): void {
    this.spellbookService.loadFromLocalStorage();
  }

  manageAddClick() {
    const newSpell: Spell =this.spellForm.value;

    this.spellbookService.addSpell(newSpell);
    this.spellForm.reset();

    this.scrollToSpellbook();
    this.spellForm.reset();
  }

  manageEditClick() {
    const spell: Spell = {...this.spellForm.value};
    console.log('edit spell', spell);
    this.spellbookService.editSpell(spell);

    this.exitEditMode();
    this.scrollToSpellbook();
    this.spellForm.reset();
  }

  manageDeleteClick() {
    const spellId = this.spellForm.value.spellID;
    console.log('manageDeleteClick', spellId);
    this.spellbookService.deleteSpell(spellId);
    this.exitEditMode();
    this.scrollToSpellbook();
    this.spellForm.reset();
  }

  manageImportClick(file: File) {
    this.spellbookService.loadFromFile(file);
  }

  manageExportClick() {
    this.spellbookService.exportJSON();
  }

  printSpellBook() {
    //https://stackoverflow.com/questions/58972025/export-html-page-to-pdf-in-angular
    //vedere codice di fabio biondi anche
    // const divContents = document.getElementById('printHere')?.innerHTML;
    // const printWindow = window.open('', '', 'height=400,width=800');
    // console.log(divContents);
    // if (divContents && printWindow) {
    //   printWindow.document.write(divContents);
    // }
  }

  spellClick(spell: Spell) {
    console.log('clicked spell', spell)
    this.spellForm.patchValue(spell);
    if (this.openAccordion) {
      this.openAccordion = false;
    }
    this.openAccordion = true;
    this.editMode = true;
  }

  scrollToSpellbook() {
    if (this.spellbookRef?.nativeElement) {
      (this.spellbookRef.nativeElement as HTMLElement).scrollIntoView();
    }
  }

  scrollToAccordion() {
    if (this.accordionRef?.nativeElement) {
      (this.accordionRef.nativeElement as HTMLElement).scrollIntoView();
    }
  }

  handleAccordionStatus(data: boolean) {
    this.openAccordion = data;
    if(!data) {
      this.spellForm.reset();
    }
  }

  /**
   * Checks if at least one of the form field has a value
   */
  get spellFormNotEmpty(): boolean {
    const formValues: any[] = Object.values(this.spellForm.value);
    return formValues.filter(val => !!val).length > 0;
  }

  exitEditMode() {
    this.editMode = false;
    this.openAccordion = false;
  }
}
