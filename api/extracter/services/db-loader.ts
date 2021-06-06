// @ts-ignore
globalThis.window = {}
import '../../../common/js/unitUtils'
// @ts-ignore
globalThis.UnitUtils = globalThis.window.UnitUtils
import '../../../common/data/aliases'
import '../../../common/data/cooldowns'
import '../../../common/data/evolutions'
import '../../../common/data/families'
import '../../../common/data/festival'
import '../../../common/data/flags'
import '../../../common/data/units'
import '../../../common/js/utils'
import '../../../common/data/details'
import '../../../common/data/drops'
import '../../../common/data/gw'
import PirateRumble from '../../../common/data/rumble.json'
import { OldDB } from '../models/old-db'

interface DBWindow {
  Utils: any
  evolutions: OldDB.BaseUnitEvolution
  details: OldDB.UnitDetail[]
  cooldowns: OldDB.UnitCooldown[]
  flags: OldDB.UnitFlags[]
  families: OldDB.UnitFamily[]
  units: OldDB.BaseUnit[]
  drops: OldDB.Drop.BaseDrops
  aliases: OldDB.Aliases
  gw: OldDB.GameWith
}

// @ts-ignore
const w = window as any as DBWindow

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
export const DBRumble = PirateRumble as any as OldDB.PirateFest.PirateRumbleData
