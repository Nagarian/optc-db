import { OldDB } from '../../models/old-db'
import { RawDB } from '../../models/raw-db'
import { extractCaptain } from './captain'
import {
  extractClass,
  extractFrenchName,
  extractJapanName,
  extractColorType,
} from './old-db-helper'
import { extractSailor } from './sailor'
import { extractSpecial } from './special'
import { extractStats } from './statistic'

export function extractDualUnit(
  unit: OldDB.ExtendedUnit,
  base: OldDB.ExtendedUnit,
  dualNumber: 1 | 2,
): RawDB.DualUnitDetail {
  const sailors = extractSailor(unit)
  const unitClass = extractClass(unit)
  const unitType = extractColorType(unit)
  const { cooldown, maxLevel, ...dualSpecial } =
    extractSpecial({ ...unit, cooldown: base.cooldown }, dualNumber) ||
    extractSpecial(base, dualNumber) ||
    {}

  return {
    name: unit.name.replace('[Dual Unit] ', ''),
    frenchName: extractFrenchName(unit),
    japanName: extractJapanName(unit),
    class: unitClass,
    type: unitType,
    stats: extractStats(unit),
    captain: extractCaptain(unit) || extractCaptain(base),
    special: Object.keys(dualSpecial).length
      ? (dualSpecial as RawDB.DualUnitSpecial)
      : undefined,
    sailor: sailors?.length ? sailors : extractSailor(base),
  }
}
