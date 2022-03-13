import { RawDB } from '../../../raw-db/models/raw-db'
import { FinalDB } from '../../models/final-db'
import {
  targetToStringMain,
  patternToString,
  resilienceToString,
  abilityEffectToString,
} from './description'

export function enhanceSingleRumble(
  rawCharacter: RawDB.SingleCharacter | RawDB.DualCharacter,
  evolution: (RawDB.SingleCharacter | RawDB.DualCharacter)[],
): FinalDB.PirateRumble.Rumble | undefined {
  let rumble = rawCharacter.rumble ?? evolution.find(e => !!e.rumble)?.rumble
  if (!rumble) return undefined

  return extractFinalRumble(
    rumble,
    costCalculator(rumble, rawCharacter.flags) ?? 0,
  )
}

export function enhanceVersusRumble(
  rawCharacter: RawDB.VersusCharacter,
  evolution: RawDB.VersusCharacter[],
  dualNode: 1 | 2
): FinalDB.PirateRumble.Rumble | undefined {
  const characterWithRumbleData = rawCharacter.characters.character1.rumble
    ? rawCharacter
    : evolution.find(e => !!e.characters.character1.rumble)

  if (!characterWithRumbleData) return undefined

  const rumble = dualNode === 1
    ? characterWithRumbleData.characters.character1.rumble
    : characterWithRumbleData.characters.character2.rumble

  return extractFinalRumble(
    rumble,
    costCalculator(rumble, rawCharacter.flags) ?? 0,
  )
}

export function extractFinalRumble(
  rumble: RawDB.PirateRumble.Rumble | undefined,
  cost: number,
): FinalDB.PirateRumble.Rumble | undefined {
  if (!rumble) {
    return undefined
  }

  denormalizeEffects(rumble.ability)
  denormalizeEffects(rumble.special)

  return {
    stats: { ...rumble.stats, cost },
    target: {
      description: targetToStringMain(rumble.target),
      ...rumble.target,
    },
    //@ts-ignore
    pattern: rumble.pattern.map(p => ({
      description: patternToString(p),
      ...p,
    })),
    resilience: rumble.resilience?.map(r => ({
      description: resilienceToString(r),
      ...r,
    })),
    //@ts-ignore
    ability: rumble.ability.map(a => ({
      ...a,
      effects: a.effects.map(e => ({
        description: abilityEffectToString(e),
        ...e,
      })),
    })),
    //@ts-ignore
    special: rumble.special.map(s => ({
      ...s,
      effects: s.effects.map(e => ({
        description: abilityEffectToString(e),
        ...e,
      })),
    })),
  }
}

function denormalizeEffects(
  abilities: RawDB.PirateRumble.Special[] | RawDB.PirateRumble.Ability[],
) {
  let lastEffects: RawDB.PirateRumble.Effect[] = []
  for (const ability of abilities) {
    lastEffects = ability.effects.map((effect, i) =>
      'override' in effect ? { ...lastEffects[i], ...effect.override } : effect,
    )

    ability.effects = lastEffects
  }
}

function costCalculator(
  rumble: RawDB.PirateRumble.Rumble | undefined,
  flags: RawDB.Flag[],
): number | undefined {
  if (!rumble) return undefined

  if (rumble.stats.cost) return rumble.stats.cost

  if (
    !flags.includes('sugo') &&
    (flags.includes('rumble') ||
      flags.includes('kizuna') ||
      flags.includes('tm'))
  ) {
    return 35
  }

  return 30
}
