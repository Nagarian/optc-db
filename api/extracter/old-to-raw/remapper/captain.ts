import { OldDB } from '../models/old-db'
import { RawDB } from '../../raw-db/models/raw-db'
import { extractDescription } from './description'
import { extractNotes } from './notes'

const isSimpleCaptain = (
  captain: OldDB.UnitCaptain,
): captain is OldDB.SimpleCaptain => typeof captain === 'string'

const isDualCaptain = (
  captain: OldDB.UnitCaptain,
): captain is OldDB.DualCaptain => !!(captain as OldDB.DualCaptain).combined

const isVersusCaptain = (
  unit: OldDB.ExtendedUnit,
  captain: OldDB.UnitCaptain,
): captain is OldDB.DualCaptain => !captain && unit.dualCharacters?.length === 2

export const isLimitBrokenCaptain = (
  captain: OldDB.UnitCaptain,
): captain is OldDB.LimitBrokenCaptain =>
  !!(captain as OldDB.LimitBrokenCaptain)?.base

export function extractCaptain(
  unit: OldDB.ExtendedUnit,
): RawDB.Captain | undefined {
  const captain = unit.detail.captain

  if (!captain) return undefined

  if (isSimpleCaptain(captain)) {
    return {
      name: '',
      baseDescription: extractDescription(captain),
      notes: extractNotes(unit.detail.captainNotes),
    }
  }

  if (isDualCaptain(captain)) {
    return {
      name: '',
      baseDescription: extractDescription(captain.combined),
      notes: extractNotes(unit.detail.captainNotes),
    }
  }

  if (isVersusCaptain(unit, captain)) {
    return undefined
  }

  if (isLimitBrokenCaptain(captain)) {
    const upgrades = Object.entries(captain)
      .filter(([key, desc]) => key.startsWith('level'))
      .flatMap(([key, desc]) => (desc ? [desc] : []))
      .map<RawDB.CaptainUpgrade>(description => ({ description: extractDescription(description) }))

    return {
      name: '',
      baseDescription: extractDescription(captain.base),
      notes: extractNotes(unit.detail.captainNotes),
      upgrades,
    }
  }

  return undefined
}
