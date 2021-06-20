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

const range = (start: number, end: number) =>
  Array.from({ length: end - start }, (_, i) => i + start)

const permanentlyDiscounted = [
  // mugiwara psy batch
  ...range(2935, 2952),
  // original usopp & its evolutions
  ...[13, 14, 15, 16, 1446],
  // stampede usopp
  ...[2679, 2680],
]

export function fixupRumbleCost(unit: OldDB.ExtendedUnit): OldDB.ExtendedUnit {
  if (!permanentlyDiscounted.includes(unit.id) || !unit.rumble) {
    return unit
  }

  return {
    ...unit,
    rumble: {
      ...unit.rumble,
      stats: {
        ...unit.rumble.stats,
        cost: 20,
      },
    },
  }
}
