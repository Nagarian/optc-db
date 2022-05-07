import { OldDB } from '../models/old-db'
import { RawDB } from '../../raw-db/models/raw-db'

const isSimpleSailor = (
  sailor: OldDB.UnitSailor,
): sailor is OldDB.SimpleSailor => typeof sailor === 'string'

export function extractSailor(
  unit: OldDB.ExtendedUnit,
): RawDB.Sailor | undefined {
  const sailor = unit.detail.sailor
  if (!sailor) return undefined

  if (isSimpleSailor(sailor)) {
    return [{ description: sailor }]
  }

  const result: RawDB.SailorDescription[] = []

  const tryAdd = (description: string | undefined | null) => {
    if (description && description != 'None') {
      result.push({ description })
    }
  }

  if ('base' in sailor) {
    tryAdd(sailor.base)
  }

  if ('base2' in sailor) {
    tryAdd(sailor.base2)
  }

  if ('combined' in sailor) {
    tryAdd(sailor.combined)
  }

  if ('level1' in sailor) {
    tryAdd(sailor.level1)
  }

  if ('level2' in sailor) {
    tryAdd(sailor.level2)
  }

  return result.length === 1 || result.length === 2
    ? (result as RawDB.Sailor)
    : undefined
}
