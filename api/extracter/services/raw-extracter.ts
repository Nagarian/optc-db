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
  extractFamily,
  extractFrenchName,
  extractJapanName,
  extractRealType
} from './old-to-raw/old-db-helper'
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
    oldDbId: unit.id >= 5000 ? unit.dbId : undefined,
    name: unit.name,
    frenchName: extractFrenchName(unit),
    japanName: extractJapanName(unit),
    family: extractFamily(unit),
    type: extractRealType(unit),
    class: extractClass(unit, true),
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
    //   pirateFest:
    //     !unit.pirateFest.class || unitType === 'VS'
    //       ? undefined
    //       : {
    //           class: unit.pirateFest.class,
    //           stats: {
    //             DEF: unit.pirateFest.DEF,
    //             SPD: unit.pirateFest.SPD,
    //           },
    //           targetPriority: unit.detail.festAttackTarget ?? '',
    //           resistance:
    //             unit.detail.festResistance ?? unit.detail.festResilience,
    //           ability: unit.detail.festAbility ?? [],
    //           behaviorPattern: unit.detail.festAttackPattern ?? [],
    //           special: unit.detail.festSpecial ?? [],
    //         },
  }
}

function remapSingleCharacter(
  unit: OldDB.ExtendedUnit,
): RawDB.SingleCharacter {
  return {
    $schema: `${rawSchemaPath}/raw-db-single.schema.json`,
    ...remapBaseCharacter(unit),
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
  }
}

function remapDualCharacter(
  unit: OldDB.ExtendedUnit,
): RawDB.DualCharacter {
  return {
    $schema: `${rawSchemaPath}/raw-db-dual.schema.json`,
    ...remapBaseCharacter(unit),
    captain: extractCaptain(unit),
    special: extractSpecial(unit),
    sailor: extractSailor(unit),
    characters: {
      swap: extractSwap(unit),
      character1: extractDualUnit(unit.dualCharacters![0], unit, 1),
      character2: extractDualUnit(unit.dualCharacters![1], unit, 2),
    },
  }
}

function remapVersusCharacter(
  unit: OldDB.ExtendedUnit,
): RawDB.VersusCharacter {
  return {
    $schema: `${rawSchemaPath}/raw-db-versus.schema.json`,
    ...remapBaseCharacter(unit),
    captain: {
      name: '',
    },
    characters: {
      criteria: unit.detail.VSCondition!,
      character1: extractVersusUnit(unit.dualCharacters![0], unit, true),
      character2: extractVersusUnit(unit.dualCharacters![1], unit, false),
    },
  }
}
