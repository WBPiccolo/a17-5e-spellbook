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
      this.spellBookSignal = signal(loadedSpellbook);
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
    this.spellBookSignal.update(spellBook => spellBook.concat(newSpell).sort((a, b) => a.level - b.level));

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

  deleteSpell(spellId: number) {
    this.spellBookSignal.update(spellBook => spellBook.filter(spell => spell.spellID != spellId));
    this.saveToLocalStorage();
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
