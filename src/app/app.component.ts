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
    const newSpell: Spell = this.spellForm.value;

    this.spellbookService.addSpell(newSpell);
    this.spellForm.reset();

    this.scrollToSpellbook();
    this.spellForm.reset();
  }

  manageEditClick() {
    const spell: Spell = { ...this.spellForm.value };
    console.log('edit spell', spell);
    this.spellbookService.editSpell(spell);

    this.exitEditMode();
    this.scrollToSpellbook();
    this.spellForm.reset();
  }

  manageDeleteClick() {
    const spell: Spell = this.spellForm.value;
    console.log('manageDeleteClick', spell);
    this.spellbookService.deleteSpell(spell);
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

    //window.print();
    const printElement = this.spellbookRef.nativeElement as HTMLElement;
    const cssElement = getComputedStyle(printElement);
    console.log(printElement);
    const css: string = `
        <style>
          .spellbook {
              display: grid;
              grid-template-columns: 1fr 1fr 1fr;
          }

          .spell-card {
            border: 1px solid #ccc;
            padding: 10px;
            margin: 10px;
            border-radius: 8px;
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
            
            &__name {
                font-size: 1.2em;
                font-weight: bold;
                margin-bottom: 8px;
            }
        
            &__metadata {
                text-align: center;
                font-style: italic;
                margin-bottom: 8px;
            }
        
            &__casting-info {
                margin-bottom: 8px;
        
                &__casting-time,
                &__casting-range,
                &__casting-duration {
                    margin-bottom: 4px;
                }
        
                &__label {
                    font-weight: bold;
                }
        
                &__value {
                    margin-left: 8px;
                }
            }
        
            &__description,
            &__higher-levels {
                margin-bottom: 8px;
            }
        
            &__footer {
                font-size: 0.9em;
                color: #777;
            }
        }
        

        </style>
    `;
    const htmlTemplate: string = `
  <html>
    <head>
    ${css}
    </head>
    <body>
    ${printElement.outerHTML}
    </body>

  `;
    //printElement.innerHTML;
    const printWindow = window.open('', 'PRINT', 'height=2480,width=3508');
    if (printWindow) {
      printWindow.document.write(htmlTemplate);
      // printWindow.document.write('<html><head><title></title>');
      // //TODO: Come ci passo il css?
      // printWindow.document.write('</head><body >');
      // printWindow.document.write(printElement.innerHTML);
      // printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.focus();
      setTimeout(function () { printWindow.print(); }, 1000);
    }
    // const mywindow = window.open('', 'PRINT', 'height=2480,width=3508');
    // if(mywindow){
    //   mywindow.document.write('<html><head><title>' + document.title  + '</title>');
    //   mywindow.document.write('</head><body >');
    //   mywindow.document.write('<h1>' + document.title  + '</h1>');
    //   mywindow.document.write(document.getElementById('printHere')!.innerHTML);
    //   mywindow.document.write('</body></html>');

    //   mywindow.document.close(); // necessary for IE >= 10
    //   mywindow.focus(); // necessary for IE >= 10*/

    //   mywindow.print();
    //   //mywindow.close();
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
    if (!data) {
      this.spellForm.reset();
    }
  }

  getClassColour(className: string): string {
  return this.dndClassColors.get(className) || '';
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
