import { OldDB } from '../../models/old-db'
import { RawDB } from '../../models/raw-db'
import { extractCaptain } from './captain'
import {
  extractClass,
  extractFrenchName,
  extractJapanName,
  extractType,
} from './old-db-helper'
import { extractSailor } from './sailor'
import { extractSpecial } from './special'
import { extractStats } from './statistic'

export function extractDualUnit(
  unit: OldDB.ExtendedUnit,
  base: OldDB.ExtendedUnit,
): RawDB.DualUnitDetail {
  const sailors = extractSailor(unit)
  const unitClass = extractClass(unit)
  const unitType = extractType(unit)

  return {
    name: unit.name.replace('[Dual Unit] ', ''),
    frenchName: extractFrenchName(unit),
    japanName: extractJapanName(unit),
    class: unitClass,
    type: unitType,
    stats: extractStats(unit),
    captain: extractCaptain(unit) || extractCaptain(base),
    special:
      extractSpecial({ ...unit, cooldown: base.cooldown }) ||
      extractSpecial(base),
    sailor: sailors?.length ? sailors : extractSailor(base),
  }
}
