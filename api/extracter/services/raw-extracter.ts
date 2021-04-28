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
  extractRealType,
  extractType,
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
      return remapBasicCharacter(unit)
  }
}

export function remapBasicCharacter(
  unit: OldDB.ExtendedUnit,
): RawDB.BasicCharacter {
  return {
    $schema: '../../../extracter/models/raw-db-basic.schema.json',
    oldDbId: unit.id >= 5000 ? unit.dbId : undefined,
    name: unit.name,
    frenchName: unit.aliases?.[1],
    japanName: unit.aliases?.[0],
    family: extractFamily(unit),
    type: extractType(unit),
    class: extractClass(unit),
    stats: extractStats(unit),
    rarity: unit.stars,
    flags: extractFlags(unit),
    links: extractLinks(unit),
    notes: extractRootNotes(unit),
    aliases: unit.aliases?.slice(2) ?? [],
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
    evolution: extractEvolution(unit),
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
    limitBreak: extractLimitBreak(unit),
  }
}

export function remapDualCharacter(
  unit: OldDB.ExtendedUnit,
): RawDB.DualCharacter {
  return {
    $schema: '../../../extracter/models/raw-db-dual.schema.json',
    oldDbId: unit.id >= 5000 ? unit.dbId : undefined,
    name: unit.name,
    frenchName: unit.aliases?.[1],
    japanName: unit.aliases?.[0],
    family: extractFamily(unit),
    type: 'DUAL',
    class: extractClass(unit, true),
    stats: extractStats(unit),
    rarity: unit.stars,
    flags: extractFlags(unit),
    links: extractLinks(unit),
    aliases: unit.aliases?.slice(2) ?? [],
    captain: extractCaptain(unit),
    special: extractSpecial(unit),
    sailor: extractSailor(unit),
    evolution: extractEvolution(unit),
    notes: extractRootNotes(unit),
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
    limitBreak: extractLimitBreak(unit),
    characters: {
      swap: extractSwap(unit),
      character1: extractDualUnit(unit.dualCharacters![0], unit),
      character2: extractDualUnit(unit.dualCharacters![1], unit),
    },
  }
}

export function remapVersusCharacter(
  unit: OldDB.ExtendedUnit,
): RawDB.VersusCharacter {
  return {
    $schema: '../../../extracter/models/raw-db-versus.schema.json',
    oldDbId: unit.id >= 5000 ? unit.dbId : undefined,
    name: unit.name,
    frenchName: unit.aliases?.[1],
    japanName: unit.aliases?.[0],
    family: extractFamily(unit),
    type: 'VS',
    class: extractClass(unit, true),
    stats: extractStats(unit),
    rarity: unit.stars,
    flags: extractFlags(unit),
    links: extractLinks(unit),
    notes: extractRootNotes(unit),
    aliases: unit.aliases?.slice(2) ?? [],
    captain: {
      name: '',
    },
    evolution: extractEvolution(unit),
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
    limitBreak: extractLimitBreak(unit),
    characters: {
      criteria: unit.detail.VSCondition!,
      character1: extractVersusUnit(unit.dualCharacters![0], unit, true),
      character2: extractVersusUnit(unit.dualCharacters![1], unit, false),
    },
  }
}
