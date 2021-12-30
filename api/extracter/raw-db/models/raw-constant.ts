export const LBPathTypes = [
  'hp',
  'atk',
  'rcv',
  'potential',
  'slot',
  'sailor',
  'cooldown',
  'captain',
  'key',
] as const

export const LBDescriptionPattern = {
  'Enrage/Reduce Increase Damage Taken duration':
    'Boosts base ATK by {value} the turn after taking damage and reduces Increase Damage Taken duration by {reduction} turn',
  'Critical Hit':
    "If you hit a PERFECT with this character, there is a {threshold}% chance to deal {value}% of this character's attack in extra damage",
  'Reduce Slot Bind duration':
    'Reduces Slot Bind duration by {value} turn on this character',
  'Reduce No Healing duration': 'Reduces No Healing duration by {value} turn',
  'Pinch Healing':
    "If HP is below {threshold}% at the start of the turn, recovers {value}x this character's RCV at the end of the turn each time you hit a PERFECT with this character",
  'Barrier Penetration':
    "This character's normal attack will ignore barriers if HP is above {threshold}% at the start of the turn",
  '[STR] Damage Reduction':
    'Reduce damage taken from STR characters by {value}%',
  '[DEX] Damage Reduction':
    'Reduce damage taken from DEX characters by {value}%',
  '[QCK] Damage Reduction':
    'Reduce damage taken from QCK characters by {value}%',
  '[PSY] Damage Reduction':
    'Reduce damage taken from PSY characters by {value}%',
  '[INT] Damage Reduction':
    'Reduce damage taken from INT characters by {value}%',
  'Cooldown Reduction':
    'Reduce own Special Cooldown by {value} turn at the start of the fight',
  'Double Special Activation':
    'Once per an adventure, reduce own Special Cooldown by {value} turns after the first time this special is used',
  'Reduce Ship Bind duration': 'Reduce Ship Bind duration by {value} turn',
  'Reduce Sailor Despair duration':
    'Reduce own Sailor Despair duration by {value} turns',
  'Nutrition/Reduce Hunger duration':
    'Boosts base ATK by {value} the turn after recovering {threshold} HP and reduces Hunger stack by {reduction} stacks',
}

export const Flags = [
  // DROP Categories

  /** Rare recruit */
  'sugo',
  /** Limited Rare recruit */
  'limited',
  /** Support Rare recruit */
  'support',

  /** Drop Location: Treasure Map */
  'tm',
  /** Drop Location */
  'kizuna',
  /** Drop Location */
  'rumble',
  /** Drop Location */
  'story',
  /** Drop Location */
  'fortnight',
  /** Drop Location */
  'coliseum',
  /** Drop Location */
  'arena',
  /** Drop Location */
  'raid',
  /** Drop Location */
  'ambush',
  /** Drop Location: Blitz, point-events, quests from Events Island game mode */
  'events',
  /** Drop Location: Mostly character gifted */
  'special',
  /** Drop Location: Shop (Rayleigh bazaar, TM shop, ...) */
  'shop',

  // other flags

  /** 6*,6*+ and their pre-evolution
   *
   * Auto-computed, doesn't need to be manually added
   */
  'legend',

  /** Released only on Global */
  'gloex',
  /** Released only on Japan (Glo-first unit which has been release later on japan) */
  'japex',

  /** Character which has been removed from the game */
  'removed',

  /** Inkable */
  'inkable',
] as const

export const StatsTypes = ['ATK', 'HP', 'RCV'] as const

export const EvolutionSkulls = [
  'skull',
  'skullSTR',
  'skullDEX',
  'skullQCK',
  'skullPSY',
  'skullINT',
] as const
