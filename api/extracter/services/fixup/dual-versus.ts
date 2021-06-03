import { OldDB } from '../../models/old-db'
import { isDualClass, isVersusClass } from '../old-to-raw/old-db-helper'

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

  const name = unit.name.substring(unit.name.indexOf(',') + 1).trim()
  if (name === unit.name && !complexMapping[unit.dbId]) {
    throw new Error(
      `unit ${unit.dbId} "${unit.name}" is a dual unit without a comma in his name`,
    )
  }

  let duals = units
    .filter(isGhostUnit)
    .filter(
      u =>
        u.name.includes(name) ||
        complexMapping[unit.dbId]?.some(str => u.name.includes(str)),
    )

  if (complexMapping[unit.dbId]) {
    duals = units
      .filter(isGhostUnit)
      .filter(u => complexMapping[unit.dbId].includes(u.name))
  }

  const isValidVersus = isVersusClass(unit.class) && duals.length === 2
  const isValidDualMonoType =
    isDualClass(unit.class) &&
    unit.type[0] === unit.type[1] &&
    duals.length === 3
  const isValidDual = isDualClass(unit.class) && duals.length === 4

  if (!isValidVersus && !isValidDualMonoType && !isValidDual) {
    throw new Error(
      `unit ${unit.dbId} "${unit.name}" has submapping issue (${
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
  2399: [
    '[Dual Unit] Crocodile, Revived Pirate',
    '[Dual Unit] Daz, Revived Assassin',
    '[Dual Unit] Crocodile & Daz, Revived Duo',
  ],
  2551: [
    '[Dual Unit] Admiral Sengoku',
    '[Dual Unit] Vice Admiral Garp',
    '[Dual Unit] Admiral Sengoku and Vice Admiral Garp',
  ],
  2556: [
    '[Dual Unit] Red Hair Shanks',
    '[Dual Unit] Ben Beckman',
    '[Dual Unit] Red Hair Shanks & Ben Beckman',
  ],
  3279: ['[Dual Unit] Marshall D. Teach, Two Overwhelming Abilities'],
  3280: ['[Dual Unit] Blackbeard, Two Overwhelming Abilities'],
}
