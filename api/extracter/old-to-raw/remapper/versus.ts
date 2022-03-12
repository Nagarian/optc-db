import { RawDB } from '../../raw-db/models/raw-db'
import { OldDB } from '../models/old-db'
import { extractCaptain } from './captain'
import { extractNotes } from './notes'
import {
  extractClass,
  extractColorType,
  extractFrenchName,
  extractJapanName,
} from './old-db-helper'
import { extractRumble } from './rumble'
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
    type: extractColorType(unit),
    stats: extractStats(unit),
    captain: captain,
    special: special,
    sailor: sailor,
    rumble: extractRumble(unit),
    versus: {
      description: unit.detail.VSSpecial!,
      notes: extractNotes(unit.detail.VSSpecialNotes),
    },
  }
}