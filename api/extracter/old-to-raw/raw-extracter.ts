import { OldDB } from '../old-to-raw/models/old-db'
import { RawDB } from '../raw-db/models/raw-db'
import { extractCaptain, extractCaptainLBUpgrade } from './remapper/captain'
import { extractDualUnit } from './remapper/dual'
import { extractEvolution } from './remapper/evolution'
import { extractFamily } from './remapper/family'
import { extractFlags } from './remapper/flags'
import { extractLevelLimitBreak } from './remapper/level-limit-break'
import { extractLimitBreak } from './remapper/limit-break'
import { extractLinks } from './remapper/links'
import { extractNotes, extractRootNotes } from './remapper/notes'
import {
  extractClass,
  extractColorType,
  extractFrenchName,
  extractJapanName,
  extractRealType,
} from './remapper/old-db-helper'
import { extractRumble } from './remapper/rumble'
import { extractSailor } from './remapper/sailor'
import { extractSpecial } from './remapper/special'
import { extractStats } from './remapper/statistic'
import { extractSupport } from './remapper/support'
import { extractSwap } from './remapper/swap'
import { extractVersusUnit } from './remapper/versus'

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
  const captainUpgrades = extractCaptainLBUpgrade(unit)
  return {
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
    limitBreak: extractLimitBreak(unit, captainUpgrades),
    levelLimitBreak: extractLevelLimitBreak(unit),
  }
}

function remapSingleCharacter(unit: OldDB.ExtendedUnit): RawDB.SingleCharacter {
  const { oldDbId, name, frenchName, japanName, family, limitBreak, levelLimitBreak, ...base } =
    remapBaseCharacter(unit)
  return {
    type: extractColorType(unit),
    oldDbId,
    name,
    frenchName,
    japanName,
    family,
    class: extractClass(unit, true),
    ...base,
    captain: extractCaptain(unit),
    superSpecial: !unit.detail.superSpecial
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
    levelLimitBreak,
  }
}

function remapDualCharacter(unit: OldDB.ExtendedUnit): RawDB.DualCharacter {
  const { oldDbId, name, frenchName, japanName, family, limitBreak, levelLimitBreak, ...base } =
    remapBaseCharacter(unit)
  return {
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
    levelLimitBreak,
  }
}

function remapVersusCharacter(unit: OldDB.ExtendedUnit): RawDB.VersusCharacter {
  const { limitBreak, levelLimitBreak, ...base } = remapBaseCharacter(unit)
  return {
    type: 'VS',
    ...base,
    captain: {
      name: '',
    },
    limitBreak,
    levelLimitBreak,
    characters: {
      criteria: unit.detail.VSCondition!,
      character1: extractVersusUnit(unit.dualCharacters![0], unit, true),
      character2: extractVersusUnit(unit.dualCharacters![1], unit, false),
    },
  }
}
