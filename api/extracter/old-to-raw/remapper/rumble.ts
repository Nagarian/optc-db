import { OldDB } from '../models/old-db'
import { RawDB } from '../../raw-db/models/raw-db'

export function extractRumble(
  unit: OldDB.ExtendedUnit,
): RawDB.PirateRumble.Rumble | undefined {
  if (!unit.rumble) {
    return undefined
  }

  const { ability, pattern, special, target, stats, resilience } = unit.rumble

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
  const result = { ...effect }

  if ('override' in result && result.override) {
    result.override = extractEffect(result.override as any) as any
  }

  if ('attributes' in result && result.attributes) {
    result.attributes = result.attributes.map(extractAttribute) as any
  }

  if ('condition' in result && result.condition?.stat) {
    result.condition = { ...result.condition }
    result.condition.stat = extractAttribute(result.condition.stat!) as any
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
