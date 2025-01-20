export interface Mob {
  id?:                  number;
  name?:                string;
  desc?:                string;
  level?:               number;
  health?:              number;
  goldMin?:             number;
  goldMax?:             number;
  atkSpeed?:            number;
  dmgMin?:              number;
  dmgMax?:              number;
  moveSpeed?:           number;
  spriteName?:          string;
  factionId?:           number;
  factionXp?:           number;
  createdAt?:           Date;
  updatedAt?:           Date;
  definitionUpdatedAt?: Date;
  note?:                string;
  artist?:              string;
  numSpawns?:           string;
  spawnTimeSec?:        string;
  drops?:               Drop[];
  faction?:             Faction;
  locations?:           Location[];
}

export interface Drop {
  mobId?:    number;
  itemId?:   number;
  dropRate?: number;
  count?:    number;
  item?:     Item;
}

export interface Item {
  id?:            number;
  spriteName?:    string;
  name?:          string;
  sellPrice?:     number;
  sellPriceUnit?: string;
}

export interface Faction {
  id?:         number;
  spriteName?: string;
  name?:       string;
  note?:       string;
  createdAt?:  Date;
  updatedAt?:  Date;
}

export interface Location {
  area?: Area;
}

export interface Area {
  id?:   number;
  name?: string;
}
