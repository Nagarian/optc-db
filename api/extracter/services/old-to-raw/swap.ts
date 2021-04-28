import { OldDB } from '../../models/old-db'
import { RawDB } from '../../models/raw-db'
import { extractNotes } from './notes'

export const isSuperSwap = (
  value: OldDB.UnitSuperSwap | string,
): value is OldDB.UnitSuperSwap => typeof value === 'object'

export function extractSwap(unit: OldDB.ExtendedUnit): RawDB.Swap {
  const swap = unit.detail.swap

  if (!swap) {
    throw new Error(`Character ${unit.id} miss its swap description`)
  }

  if (!isSuperSwap(swap)) {
    return {
      description: swap,
      notes: extractNotes(unit.detail.swapNotes),
    }
  }

  return {
    description: swap.base,
    super: {
      criteria: swap.superTurns,
      description: swap.super,
    },
    notes: extractNotes(unit.detail.swapNotes),
  }
}
