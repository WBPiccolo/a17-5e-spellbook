# A175eSpellbook

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.8. \
I needed a simple application to handle my spell (custom ones too), so I wrote this.


## Writing a spell
You can use the form or import a JSON file with this structure: 
```typescript
[{
  name: string;
  level: number;
  school?: string;
  castingTime: string;
  range: string;
  duration: string;
  components?: string;
  description: string;
  atHigherLevels?: string;
  isRitual?: boolean;
  source?: string;
  requiresConcentration?: boolean;
  class: string;
  spellID: number;
}...]
```

## Saving a spell
You can save the spellbook as a json file by clicking the "export" button.\
At each operation the spellbook is saved in the local storage, too.


## Printing the spell
Press the print button, although it's quite buggy.