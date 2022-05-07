import { OldDB } from '../models/old-db'
import { RawDB } from '../../raw-db/models/raw-db'

export function extractLinks(
  unit: OldDB.ExtendedUnit,
): RawDB.AffiliatedLinks | undefined {
  if (!unit.gamewith) return undefined

  return {
    gamewithId: unit.gamewith,
  }
}
