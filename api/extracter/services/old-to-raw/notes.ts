import { OldDB } from '../../models/old-db'
import { flagNotes } from './flags'

export function extractRootNotes(unit: OldDB.ExtendedUnit): string | undefined {
  const [, notes] = flagNotes[unit.id] ?? []
  return notes
}
