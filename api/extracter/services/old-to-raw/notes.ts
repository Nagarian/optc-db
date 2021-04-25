import { OldDB } from '../../models/old-db'
import { flagNotes } from './flags'

const rootNotes: Record<number, string> = {
  3383: 'This unit has been given only for those who have dropped "Red Hair Pirates, Pirates Enjoying a Feast" on their debuting Sugo-Fest.',
  1245: 'This Limit Break is exclusive to Global ONLY',
  1247: 'This Limit Break is exclusive to Global ONLY',
  1680: 'This Limit Break is exclusive to Global ONLY',
}

export function extractRootNotes(unit: OldDB.ExtendedUnit): string | undefined {
  const [, flagNote] = flagNotes[unit.id] ?? []
  const note = rootNotes[unit.id]

  return [flagNote, note].filter(x => !!x).join(' ')
}

const computableNotes = {
  additionalDamage:
    'Every attacking character gains additional damage if they land a hit no less than Good. Is affected by Conditional ATK boost and Affinity ATK boost',
  beneficial:
    '"Beneficial" orbs grant the same ATK boost as matching orbs and activate any Captain Abilities that are enabled by matching orbs.',
  enrage:
    'Enrage is activated when your crew took damage from your enemies or map effects in the previous turn or if you reduced your own HP in the previous turn',
  fixed: "Fixed damage means it entirely bypasses the enemy's defense.",
  gOrbs:
    'Characters with [G] orbs will deal 1.5x their normal damage. [G] orbs are affected by orb boosters.',
  stages: 'The special can be used as soon as the first stage is reached.',
  silence:
    "This is called 'Special Bind' in-game and refers to effects that prevent you from activating Special Abilities.",
  ignoreBarrier:
    "Damage that ignores damage negating abilities and barriers is similar to 6* Law's special, but only for this character.",
  zombie:
    'The protection only works when attacked by one single enemy and will leave the team with at least 1 HP, the effect will not work when attacked by multiples enemies at once.',

  //captain specific and space behavior
  noFixedPerc:
    "Specials that deal fixed damage or cut a percentage of the enemy's HP are not affected by this captain ability",
  // need to extract value
  orb:
    'Orb amplification only affects matching and opposite orbs and works both ways: matching orbs will deal #1 more damage and opposite orbs will deal #1 less damage.',
  randomHits: 'The target of each of the #1 hits is chosen randomly.',
  rewind:
    'Some enemies can increase your cooldown by 1/2 turns, this Sailor Ability decreases that by #1 turn(s).',
  colorAffinity:
    "'Color Affinity' boosts color type advantages. For example, a STR unit normally deals 2x to a DEX unit and .5x to QCK. With this Color Affinity boost, it will deal (2*#1)x to DEX and (0.5/#1)x to QCK.",
}

const notes = {
  captainProportional:
    "The exact multiplier used to compute the damage is proportional to the crew's remaining HP and is higher the #1 the HP is. The multiplier is calculated as #2. At full health the boost is equal to #3x, with 1 HP left to #4x.",
  poison:
    "Poison deals #1 character's ATK in fixed damage that bypasses defensive buffs at the end of each turn.",
  toxic:
    "Toxic starts at #1 character's attack and increases by #2 at the end of every turn until #3 damage per turn.",
  random: 'Estimated random damage range: between #1 HP and #2 HP #3.',
  randomHeal: 'Estimated random recovery range: between #1 HP and #2 HP.',
  specialProportional:
    "The exact multiplier used to compute the damage is proportional to the crew's remaining HP and is higher the #1 the HP is. The multiplier is calculated as: #2.",
  instantKill:
    'The chance for this character to instantly kill any enemy is #1. The kills can not be reset by exiting the game, but can change by passing the turn or killing an enemy on that stage.',
}

export function extractNotes(notes?: string): string | undefined {
  if (!notes) return undefined

  return notes
    .replace(/#\{(.+?)\}/g, (match, matchingContent: string) => {
      const [key] = matchingContent.trim().split(/:/) ?? []

      if (!key) {
        return match
      }

      if (computableNotes.hasOwnProperty(key.trim())) {
        return ''
      } else if (notes.hasOwnProperty(key.trim())) {
        console.error(`Unrecognized key: ${key}`)
      }

       return match
    })
    .replace('<br>', '\n')
    .trim()
}
