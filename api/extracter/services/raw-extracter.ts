import { OldDB } from '../models/old-db'
import { RawDB } from '../models/raw-db'
import { extractCaptain } from './old-to-raw/captain'
import { extractDualUnit } from './old-to-raw/dual'
import { extractEvolution } from './old-to-raw/evolution'
import { extractFlags } from './old-to-raw/flags'
import { extractLimitBreak } from './old-to-raw/limit-break'
import { extractLinks } from './old-to-raw/links'
import { extractNotes, extractRootNotes } from './old-to-raw/notes'
import {
  extractClass,
  extractColorType,
  extractFamily,
  extractFrenchName,
  extractJapanName,
  extractRealType,
} from './old-to-raw/old-db-helper'
import { extractRumble } from './old-to-raw/rumble'
import { extractSailor } from './old-to-raw/sailor'
import { extractSpecial } from './old-to-raw/special'
import { extractStats } from './old-to-raw/statistic'
import { extractSupport } from './old-to-raw/support'
import { extractSwap } from './old-to-raw/swap'
import { extractVersusUnit } from './old-to-raw/versus'

export function remapper(db: OldDB.ExtendedUnit[]): RawDB.DBCharacter[] {
  return db.map(unit => [unit.id, remap(unit)])
}

export function remap(unit: OldDB.ExtendedUnit): RawDB.Character {
  const unitType = extractRealType(unit)

  switch (unitType) {
    case 'DUAL':
      return remapDualCharacter(unit)
    case 'VS':
      return remapVersusCharacter(unit)
    default:
      return remapSingleCharacter(unit)
  }
}

const rawSchemaPath = '../..'

function remapBaseCharacter(unit: OldDB.ExtendedUnit): RawDB.BaseCharacter {
  return {
    $schema: `${rawSchemaPath}/raw-db-schema.json`,
    oldDbId: unit.id >= 5000 ? unit.dbId : undefined,
    name: unit.name,
    frenchName: extractFrenchName(unit),
    japanName: extractJapanName(unit),
    family: extractFamily(unit),
    rarity: unit.stars,
    stats: extractStats(unit),
    cost: unit.cost,
    slots: unit.slots,
    maxExp: unit.maxEXP || undefined,
    maxLevel: unit.maxLevel || 0,
    flags: extractFlags(unit),
    links: extractLinks(unit),
    notes: extractRootNotes(unit),
    aliases: unit.aliases?.slice(2) ?? [],
    evolution: extractEvolution(unit),
    limitBreak: extractLimitBreak(unit),
  }
}

function remapSingleCharacter(unit: OldDB.ExtendedUnit): RawDB.SingleCharacter {
  const {
    $schema,
    oldDbId,
    name,
    frenchName,
    japanName,
    family,
    limitBreak,
    ...base
  } = remapBaseCharacter(unit)
  return {
    $schema,
    type: extractColorType(unit),
    oldDbId,
    name,
    frenchName,
    japanName,
    family,
    class: extractClass(unit, true),
    ...base,
    captain: extractCaptain(unit),
    superType: !unit.detail.superSpecial
      ? undefined
      : {
          criteria: unit.detail.superSpecialCriteria!,
          description: unit.detail.superSpecial,
          notes: extractNotes(unit.detail.superSpecialNotes),
        },
    special: extractSpecial(unit),
    sailor: extractSailor(unit),
    support: extractSupport(unit),
    limitBreak,
    rumble: extractRumble(unit),
  }
}

function remapDualCharacter(unit: OldDB.ExtendedUnit): RawDB.DualCharacter {
  const {
    $schema,
    oldDbId,
    name,
    frenchName,
    japanName,
    family,
    limitBreak,
    ...base
  } = remapBaseCharacter(unit)
  return {
    $schema,
    type: 'DUAL',
    oldDbId,
    name,
    frenchName,
    japanName,
    family,
    class: extractClass(unit, true),
    ...base,
    captain: extractCaptain(unit),
    special: extractSpecial(unit),
    sailor: extractSailor(unit),
    characters: {
      swap: extractSwap(unit),
      character1: extractDualUnit(unit.dualCharacters![0], unit, 1),
      character2: extractDualUnit(unit.dualCharacters![1], unit, 2),
    },
    limitBreak,
    rumble: extractRumble(unit),
  }
}

function remapVersusCharacter(unit: OldDB.ExtendedUnit): RawDB.VersusCharacter {
  const { $schema, limitBreak, ...base } = remapBaseCharacter(unit)
  return {
    $schema,
    type: 'VS',
    ...base,
    captain: {
      name: '',
    },
    limitBreak,
    characters: {
      criteria: unit.detail.VSCondition!,
      character1: extractVersusUnit(unit.dualCharacters![0], unit, true),
      character2: extractVersusUnit(unit.dualCharacters![1], unit, false),
    },
  }
}
