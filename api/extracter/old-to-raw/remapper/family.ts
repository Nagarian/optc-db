import { RawDB } from '../../raw-db/models/raw-db'
import { familiesKey } from '../../raw-to-final/enhancer/family'
import { OldDB } from '../models/old-db'

export function extractFamily(unit: OldDB.BaseUnit): RawDB.Family[] {
  if (!unit.families) return []

  return Object.entries(familiesKey)
    .filter(([_, entries]) => entries.every(s => unit.families?.includes(s)))
    .map(([key]) => key as RawDB.Family)
}
