export type Gold = number[] | number
export type Rate = number[] | number
export type Icon =
  | "consumable-faction-badge-cc"
  | "consumable-faction-badge-nwo"
  | "consumable-faction-badge-sa"
  | "consumable-faction-badge-mc"
  | "consumable-faction-badge-ob"
  | "consumable-faction-badge-lotd"
  | "consumable-faction-badge-mm"
  | "consumable-faction-badge-ff"
  | "consumable-faction-badge-gu"
  | "consumable-faction-badge-eotd"
  | "consumable-faction-badge-lv"
  | "consumable-faction-badge-cotf"
  | "consumable-faction-badge-lumber-lord"
export type Name =
  | "Crab Crusaders"
  | "New World Order"
  | "Skele Assassins"
  | "Miner Collective"
  | "Obsidian Brotherhood"
  | "Legion of the Dead"
  | "Martian Marauders"
  | "Forest Fellowship"
  | "Glacier Union"
  | "Echoes of the Deep"
  | "Lost Vanguard"
  | "Forest Keepers"
  | "Lumber Lords"
export type MapFilenameOverride =
  | "whispering-wilds"
  | "tols"
  | "dark-marsh"
  | "surfside-shores"
export type MySchema = MobData[]

export interface MobData {
  id: number
  spriteFilename: string
  alwaysAnimate: number
  yoffset: number
  level: number
  health: number
  minDamage: number
  maxDamage: number
  attackSpeed: number
  moveSpeed: number
  factionXp: number
  weaponType: number
  hate: number
  aggroRadius: number
  aggroCheckIntervalMin: null
  aggroCheckIntervalMax: null
  debuffs: Debuff[] | null
  spawns: Spawn[]
  drops: ItemDrop[]
  gold: Gold
  wander: number
  spawn: number
  name: string
  faction: Faction
  zones: Zone[]
  translations: Translations
}
export interface Debuff {
  ci: number
  ccp: number
  sdid: number
}
export interface Spawn {
  x: number
  y: number
  z: number
  rx: number
  ry: number
  rz: number
  drops: SpawnDrop[]
  gold: Gold
  zoneId: number
}
export interface SpawnDrop {
  id: number
  rates: number[]
}
export interface ItemDrop {
  id: number
  name: string
  spriteFilename: string
  translations: Translations
  vendorBuyPrice: number
  vendorBuyCurrency: number
  rate: Rate
  count: number
}
export interface Translations {}
export interface Faction {
  id: number
  icon: Icon
  name: Name
  translations: Translations
  count: number
}
export interface Zone {
  id: number
  name: string
  heightInPixels: number
  widthInPixels: number
  mapFilenameOverride: MapFilenameOverride | null
}
