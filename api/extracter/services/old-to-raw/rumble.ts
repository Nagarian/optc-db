import { OldDB } from '../../models/old-db'
import { RawDB } from '../../models/raw-db'

export function extractRumble(
  unit: OldDB.ExtendedUnit,
): RawDB.PirateRumble.Rumble | undefined {
  if (!unit.rumble) {
    return undefined
  }

  const { ability, pattern, special, target, stats, resilience } = unit.rumble

  return {
    stats,
    target,
    pattern,
    resilience,
    ability,
    special,
  }
}
