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
      description: extractDescription(captain),
      notes: extractNotes(unit.detail.captainNotes),
    }
  }

  if (isDualCaptain(captain)) {
    return {
      name: '',
      description: extractDescription(captain.combined),
      notes: extractNotes(unit.detail.captainNotes),
    }
  }

  if (isVersusCaptain(unit, captain)) {
    return undefined
  }

  if (isLimitBrokenCaptain(captain)) {
    return {
      name: '',
      description: extractDescription(captain.base),
      notes: extractNotes(unit.detail.captainNotes),
    }
  }

  return undefined
}

export function extractCaptainLBUpgrade(
  unit: OldDB.ExtendedUnit,
): RawDB.CaptainDescription[] {
  const captain = unit.detail.captain

  if (!captain) return []

  if (isSimpleCaptain(captain)) {
    return []
  }

  if (isDualCaptain(captain)) {
    return []
  }

  if (isVersusCaptain(unit, captain)) {
    return []
  }

  if (isLimitBrokenCaptain(captain)) {
    const upgrades = Object.entries(captain)
      .filter(([key, desc]) => key.startsWith('level'))
      .flatMap(([key, desc]) => (desc ? [desc] : []))
      .map<RawDB.CaptainDescription>(description => ({
        description: extractDescription(description),
      }))

    return upgrades
  }

  return []
}

export function extractCaptainLevelLimitBreak(
  captain: OldDB.UnitCaptain,
): RawDB.CaptainDescription[] {
  if (!captain) return []

  if (isSimpleCaptain(captain)) {
    return []
  }

  if (isDualCaptain(captain)) {
    return []
  }

  if (isLimitBrokenCaptain(captain)) {
    const upgrades = [captain.base]
      .concat(
        Object.entries(captain)
          .filter(([key, desc]) => key.startsWith('level'))
          .flatMap(([key, desc]) => (desc ? [desc] : [])),
      )
      .map<RawDB.CaptainDescription>(description => ({
        description: extractDescription(description),
      }))

    return upgrades
  }

  return []
}
