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
    if(spellbook) {
      localStorage.setItem(this.localStorageItemName, JSON.stringify(spellbook));
    }
  }

  addSpell(newSpell: Spell) {
    this.spellBookSignal.update(spellBook => spellBook.concat(newSpell).sort((a, b) => a.level - b.level));

    this.saveToLocalStorage();
  }
}
