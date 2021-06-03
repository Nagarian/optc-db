import { OldDB } from '../../models/old-db'
import { RawDB } from '../../models/raw-db'
import { extractCaptain } from './captain'
import { extractNotes } from './notes'
import {
  extractClass,
  extractFrenchName,
  extractJapanName,
  extractType,
} from './old-db-helper'
import { extractSailor } from './sailor'
import { extractSpecial } from './special'
import { extractStats } from './statistic'

export function extractVersusUnit(
  unit: OldDB.ExtendedUnit,
  base: OldDB.ExtendedUnit,
  isFirstChar: boolean,
): RawDB.VersusUnitDetail {
  const captain = extractCaptain(unit)
  if (!captain) throw new Error(`VS unit ${base.id} has no captain description`)

  const special = extractSpecial(base, isFirstChar ? 1 : 2)
  if (!special) throw new Error(`VS unit ${base.id} has no special description`)

  const sailor = extractSailor(unit)
  if (!sailor) throw new Error(`VS unit ${base.id} has no sailor description`)

  return {
    name: unit.name.replace('[VS Unit] ', ''),
    frenchName: extractFrenchName(unit),
    japanName: extractJapanName(unit),
    class: extractClass(unit),
    type: extractType(unit),
    stats: extractStats(unit),
    captain: captain,
    special: special,
    sailor: sailor,
    versus: {
      description: unit.detail.VSSpecial!,
      notes: extractNotes(unit.detail.VSSpecialNotes),
    },
  }
}
