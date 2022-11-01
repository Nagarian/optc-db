import { OldDB } from '../models/old-db'
import { RawDB } from '../../raw-db/models/raw-db'

export function extractRumble(
  unit: OldDB.ExtendedUnit,
): RawDB.PirateRumble.Rumble | undefined {
  if (!unit.rumble) {
    return undefined
  }

  const {
    ability,
    pattern,
    special,
    target,
    stats,
    resilience,
    gpcondition,
    gpability,
    gpspecial,
  } = unit.rumble

  return {
    stats,
    target: {
      ...target,
      criteria: extractAttribute(target.criteria),
    },
    pattern,
    resilience: extractRumbleResilience(resilience),
    ability: extractRumbleAbility(ability),
    special: extractRumbleSpecial(special),
    gpStat: extractGpStat(gpability, gpspecial, gpcondition),
  }
}

export function extractRumbleResilience(
  resilience: OldDB.PirateFest.Resilience[] | undefined,
): RawDB.PirateRumble.Resilience[] | undefined {
  return resilience?.map(extractResilience)
}

export function extractRumbleSpecial(
  special: [
    OldDB.PirateFest.Special,
    OldDB.PirateFest.Special,
    OldDB.PirateFest.Special,
    OldDB.PirateFest.Special,
    OldDB.PirateFest.Special,
    OldDB.PirateFest.Special,
    OldDB.PirateFest.Special,
    OldDB.PirateFest.Special,
    OldDB.PirateFest.Special,
    OldDB.PirateFest.Special,
  ],
): [
  RawDB.PirateRumble.Special,
  RawDB.PirateRumble.Special,
  RawDB.PirateRumble.Special,
  RawDB.PirateRumble.Special,
  RawDB.PirateRumble.Special,
  RawDB.PirateRumble.Special,
  RawDB.PirateRumble.Special,
  RawDB.PirateRumble.Special,
  RawDB.PirateRumble.Special,
  RawDB.PirateRumble.Special,
] {
  return special.map(s => ({
    ...s,
    effects: s.effects.map(extractEffect),
  })) as any
}

export function extractRumbleAbility(
  ability: [
    OldDB.PirateFest.Ability,
    OldDB.PirateFest.Ability,
    OldDB.PirateFest.Ability,
    OldDB.PirateFest.Ability,
    OldDB.PirateFest.Ability,
  ],
): [
  RawDB.PirateRumble.Ability,
  RawDB.PirateRumble.Ability,
  RawDB.PirateRumble.Ability,
  RawDB.PirateRumble.Ability,
  RawDB.PirateRumble.Ability,
] {
  return ability.map(a => ({
    ...a,
    effects: a.effects.map(extractEffect),
  })) as any
}

function extractAttribute(
  attribute: OldDB.PirateFest.Attribute,
): RawDB.PirateRumble.Attribute {
  switch (attribute) {
    case '[STR]':
      return 'STR'
    case '[DEX]':
      return 'DEX'
    case '[QCK]':
      return 'QCK'
    case '[PSY]':
      return 'PSY'
    case '[INT]':
      return 'INT'
    default:
      return attribute
  }
}

function extractEffect(
  effect: OldDB.PirateFest.Effect,
): RawDB.PirateRumble.Effect {
  if ('override' in effect && effect.override) {
    return {
      override: extractEffect(effect.override as any) as any,
    }
  }

  const result = { ...effect }

  if ('attributes' in result && result.attributes) {
    result.attributes = result.attributes.map(extractAttribute) as any
  }

  if ('condition' in result && result.condition?.stat) {
    result.condition = extractCondition(result.condition) as any
  }

  if ('targeting' in result && result.targeting) {
    result.targeting = { ...result.targeting }
    result.targeting.stat = extractAttribute(result.targeting.stat!) as any
    result.targeting.targets = result.targeting.targets.map(t =>
      extractAttribute(t as any),
    ) as any
  }

  return result as any
}

function extractCondition(
  condition: OldDB.PirateFest.Condition | undefined,
): RawDB.PirateRumble.Condition | undefined {
  if (!condition) {
    return undefined
  }

  const stat = condition.stat ? extractAttribute(condition.stat) : undefined

  return {
    ...condition,
    families: condition.families as any,
    stat,
  }
}

function extractResilience(
  resilience: OldDB.PirateFest.Resilience,
): RawDB.PirateRumble.Resilience {
  const result = { ...resilience }

  if ('attribute' in result && result.attribute) {
    result.attribute = extractAttribute(result.attribute as any) as any
  }

  if ('condition' in result && result.condition?.stat) {
    result.condition = { ...result.condition }
    result.condition.stat = extractAttribute(result.condition.stat!) as any
  }

  return result as any
}

function extractGpCondition(
  condition: OldDB.PirateFest.GpCondition | undefined,
): RawDB.PirateRumble.GpCondition | undefined {
  if (!condition) {
    return undefined
  }

  if (condition.type === 'debuff') {
    return {
      ...condition,
      attribute: extractAttribute(condition.attribute),
    }
  }

  return {
    ...condition,
  }
}

function extractGpStat(
  gpability?: [
    OldDB.PirateFest.Ability,
    OldDB.PirateFest.Ability,
    OldDB.PirateFest.Ability,
    OldDB.PirateFest.Ability,
    OldDB.PirateFest.Ability,
  ],
  gpspecial?: [
    OldDB.PirateFest.GpSpecial,
    OldDB.PirateFest.GpSpecial,
    OldDB.PirateFest.GpSpecial,
    OldDB.PirateFest.GpSpecial,
    OldDB.PirateFest.GpSpecial,
  ],
  gpcondition?: [
    OldDB.PirateFest.GpCondition,
    ...OldDB.PirateFest.GpCondition[],
  ],
): RawDB.PirateRumble.GpStat | undefined {
  if (!gpability || !gpspecial || !gpcondition) {
    return undefined
  }

  return {
    ability: extractRumbleAbility(gpability),
    burst: {
      condition: gpcondition.map(extractGpCondition) as any,
      special: gpspecial.map(gps => ({
        uses: gps.uses,
        effects: gps.effects.map(extractEffect),
      })) as any,
    },
  }
}
