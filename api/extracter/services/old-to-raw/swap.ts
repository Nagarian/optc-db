import { OldDB } from '../../models/old-db'
import { RawDB } from '../../models/raw-db'
import { extractNotes } from './notes'

export function extractSwap(unit: OldDB.ExtendedUnit): RawDB.Swap {
  const description = unit.detail.swap

  if (!description) {
    throw new Error(`Character ${unit.id} miss its swap description`)
  }

  return {
    description,
    notes: extractNotes(unit.detail.swapNotes),
  }
}
