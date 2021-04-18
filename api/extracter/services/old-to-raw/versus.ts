import { OldDB } from '../../models/old-db'
import { RawDB } from '../../models/raw-db'
import { extractCaptain } from './captain'
import { extractClass, extractType } from './old-db-helper'
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

  const special = extractSpecial(base, isFirstChar? 1 : 2)
  if (!special) throw new Error(`VS unit ${base.id} has no special description`)

  const sailor = extractSailor(unit)
  if (!sailor) throw new Error(`VS unit ${base.id} has no sailor description`)

  return {
    name: unit.name.replace('[VS Unit] ', ''),
    frenchName: unit.aliases?.[1],
    japanName: unit.aliases?.[0],
    class: extractClass(unit),
    type: extractType(unit),
    captain: captain,
    special: special,
    sailor: sailor,
    versus: {
      description: unit.detail.VSSpecial!,
      notes: unit.detail.VSSpecialNotes!
    },
    stats: extractStats(unit),
  }
}
