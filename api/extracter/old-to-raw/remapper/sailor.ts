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

  const tryAdd = (key: keyof OldDB.LimitBrokenSailor) => {
    const tmp = extractSailorDescription(sailor, key)
    if (tmp) {
      result.push(tmp)
    }
  }

  tryAdd('base')
  tryAdd('base2')
  // @ts-ignore
  tryAdd('combined')
  tryAdd('level1')
  tryAdd('level2')

  return result.length === 1 || result.length === 2
    ? (result as RawDB.Sailor)
    : undefined
}

export function extractSailorDescription(
  sailor: OldDB.LimitBrokenSailor,
  key: keyof OldDB.LimitBrokenSailor,
): RawDB.SailorDescription | undefined {
  const description = sailor[key]

  if (description && description != 'None') {
    return { description }
  }

  return undefined
}
