import { OldDB } from '../../models/old-db'
import { DBRumble } from '../db-loader'
import { extractRealType } from '../old-to-raw/old-db-helper'

export function getRumble(
  unitId: number,
  versus?: 1 | 2,
): OldDB.PirateFest.Unit | undefined {
  const normalizedId = versus ? unitId + versus / 10 : unitId

  const rumble = DBRumble.units.find(u => u.id === normalizedId)
  if (!rumble || 'basedOn' in rumble) {
    return undefined
  }

  if (rumble.japan || rumble.global) {
    throw new Error('Rumble Global/Japan specificity is not supported')
  }

  return rumble
}

export function fixupVersusRumbleData(
  unit: OldDB.ExtendedUnit,
): OldDB.ExtendedUnit {
  if (extractRealType(unit) !== 'VS') {
    return unit
  }

  return {
    ...unit,
    dualCharacters: [
      {
        ...unit.dualCharacters![0],
        rumble: getRumble(unit.dbId, 1),
      },
      {
        ...unit.dualCharacters![1],
        rumble: getRumble(unit.dbId, 2),
      },
    ],
  }
}
