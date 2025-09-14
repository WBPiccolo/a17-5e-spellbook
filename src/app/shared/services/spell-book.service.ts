import { Injectable, WritableSignal, signal } from '@angular/core';
import { Spell } from '../../../models/spell';

@Injectable({
  providedIn: 'root'
})
export class SpellBookService {
  spellBookSignal: WritableSignal<Spell[]> = signal([]);
  private readonly localStorageItemName = 'spellbook';
  //todo cripate
  constructor() { }

  loadFromLocalStorage() {
    const localStorageData = localStorage.getItem(this.localStorageItemName);
    let loadedSpellbook: Spell[] = [];
    if (localStorageData) {
      loadedSpellbook = JSON.parse(localStorageData) as Spell[];
      this.spellBookSignal = signal(loadedSpellbook.map(spell => ({...spell, spellID: new Date().getTime()})));
      console.log('loaded spellbook from localStorage', loadedSpellbook);
    } else {
      console.log(`couldn't find a saved spellbook!`);
    }
  }

  saveToLocalStorage() {
    const spellbook = this.spellBookSignal();
    console.log('salvo ', spellbook);
    if (spellbook) {
      localStorage.setItem(this.localStorageItemName, JSON.stringify(spellbook));
    }
  }

  addSpell(newSpell: Spell) {
    const spell: Spell = { ...newSpell, spellID: new Date().getTime() }
    this.spellBookSignal.update(spellBook => spellBook.concat(spell).sort((a, b) => a.level - b.level));

    this.saveToLocalStorage();
  }

  editSpell(newSpell: Spell) {
    this.spellBookSignal.update(spellBook => {
      const spellIndex = spellBook.findIndex(spell => spell.spellID === newSpell.spellID);
      if (spellIndex > -1) {
        spellBook[spellIndex] = newSpell;
      }
      return spellBook
    });

    this.saveToLocalStorage();

  }

  deleteSpell(spell: Spell) {
    console.log('elimino la spell', spell)
    const spellBook = this.spellBookSignal();
    const filteredSpellBook = spellBook.filter(savedSpell => savedSpell.name != spell.name);
    console.log(spellBook.length, filteredSpellBook.length)

    this.spellBookSignal.set(filteredSpellBook);
    this.saveToLocalStorage();
  }

  loadFromFile(file: File) {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      if (fileReader.result) {
        try {
          const res = JSON.parse(fileReader.result.toString()) as Spell[];
          const spell = res.map(res => ({...res, spellID: new Date().getTime()}))
          console.log('res', spell)
          this.spellBookSignal.update(spellbook => spell);
          this.saveToLocalStorage();

        } catch (e) {
          console.log('file non valido')
        }
      }
    }
    fileReader.readAsText(file, 'utf-8');


  }

  exportJSON() {
    const link = document.createElement('a');
    const file = new Blob([JSON.stringify(this.spellBookSignal())], { type: 'application/json' });
    link.href = URL.createObjectURL(file);
    link.download = 'spellbook.json';
    link.click();
    URL.revokeObjectURL(link.href);
  }
}
