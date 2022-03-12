import { OldDB } from '../models/old-db'
import { isDualClass, isVersusClass } from '../remapper/old-db-helper'

export function fixupDualVersusMapping(
  unit: OldDB.ExtendedUnit,
  _index: number,
  units: OldDB.ExtendedUnit[],
): OldDB.ExtendedUnit {
  if (!Array.isArray(unit.type)) {
    return unit
  }

  if (isGhostUnit(unit)) {
    return unit
  }

  const name = unit.name.substring(unit.name.indexOf(' - ') + 3).trim()
  if (name === unit.name && !complexMapping[unit.dbId]) {
    throw new Error(
      `unit ${unit.dbId} "${unit.name}" is a dual unit without a dash in his name`,
    )
  }

  let duals = complexMapping[unit.dbId]
    ? units
        .filter(isGhostUnit)
        .filter(u => complexMapping[unit.dbId].includes(u.name))
    : units.filter(isGhostUnit).filter(u => u.name.includes(name))

  const isValidVersus = isVersusClass(unit.class) && duals.length === 2
  const isValidDualMonoType =
    isDualClass(unit.class) &&
    unit.type[0] === unit.type[1] &&
    duals.length === 3
  const isValidDual = isDualClass(unit.class) && duals.length === 4

  if (!isValidVersus && !isValidDualMonoType && !isValidDual) {
    throw new Error(
      `unit ${unit.dbId} "${unit.name}" has submapping issue with "${name}" (${
        duals.length
      } units):\n${duals.map(u => u.name).join('\n')}`,
    )
  }

  return {
    ...unit,
    dualCharacters: duals,
  }
}

export function isGhostUnit(unit: OldDB.ExtendedUnit): boolean {
  return unit.name.includes('Dual Unit') || unit.name.includes('VS Unit')
}

const complexMapping: Record<number, string[]> = {
  2000: [
    '[Dual Unit] Sanji - Peerless Straw Hat Pirates',
    '[Dual Unit] Zoro - Peerless Straw Hat Pirates',
    '[Dual Unit] Sanji & Zoro - Peerless Straw Hat Pirates',
    '[Dual Unit] Sanji & Zoro - Peerless Straw Hat Pirates',
  ],
  2399: [
    '[Dual Unit] Crocodile - Revived Pirate',
    '[Dual Unit] Daz - Revived Assassin',
    '[Dual Unit] Crocodile & Daz - Revived Duo',
  ],
  2551: [
    '[Dual Unit] Admiral Sengoku',
    '[Dual Unit] Vice Admiral Garp',
    '[Dual Unit] Admiral Sengoku and Vice Admiral Garp',
  ],
  3279: ['[Dual Unit] Marshall D. Teach - Overwhelming Two Powers'],
  3280: ['[Dual Unit] Blackbeard - Overwhelming Two Powers'],
  3432: [
    '[Dual Unit] Ulti',
    '[Dual Unit] Page One',
    '[Dual Unit] Ulti & Page One',
  ],
  3252: [
    "[VS Unit] Ace - Flame and Magma",
    "[VS Unit] Akainu - Flame and Magma",
  ],
}
