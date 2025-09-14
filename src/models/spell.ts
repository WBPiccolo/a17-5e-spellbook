export interface Spell {
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
}