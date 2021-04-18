// @ts-ignore
globalThis.window = {}
import '../../../common/data/aliases'
import '../../../common/data/cooldowns'
import '../../../common/data/details'
import '../../../common/data/evolutions'
import '../../../common/data/families'
import '../../../common/data/festival'
import '../../../common/data/flags'
import '../../../common/data/units'
import '../../../common/js/utils'
import '../../../common/data/drops'
import '../../../common/data/gw'
import { OldDB } from '../models/old-db'
import { OldDrop } from '../models/old-drop'

export declare namespace OldDBWindow {
  type BaseUnitEvolution = Record<number, OldDB.UnitEvolution>
  type Aliases = Record<number, string[]>
  type GameWith = (number | null)[]
}

interface DBWindow {
  Utils: any
  evolutions: OldDBWindow.BaseUnitEvolution
  details: OldDB.UnitDetail[]
  cooldowns: OldDB.UnitCooldown[]
  flags: OldDB.UnitFlags[]
  families: OldDB.UnitFamily[]
  units: OldDB.BaseUnit[]
  drops: OldDrop.BaseDrops
  aliases: OldDBWindow.Aliases
  gw: OldDBWindow.GameWith
}

// @ts-ignore
const w = (window as any) as DBWindow

if (Array.isArray(w.units[0])) {
  w.Utils.parseUnits(false)
}

export const DButils = w.Utils
export const DBevolution = w.evolutions
export const DBdetail = w.details
export const DBcooldown = w.cooldowns
export const DBflag = w.flags
export const DBfamily = w.families
export const DBunit = w.units
export const DBdrop = w.drops
export const DBalias = w.aliases
export const DBgamewith = w.gw
