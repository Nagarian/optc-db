export const CommonLBPathTypes = [
  'potential',
  'sailor',
] as const

export const LBPathTypes = [
  ...CommonLBPathTypes,
  'hp',
  'atk',
  'rcv',
  'slot',
  'cooldown',
  'captain',
  'key',
] as const

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
