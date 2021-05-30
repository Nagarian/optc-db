export const CharacterTypes = ['STR', 'DEX', 'QCK', 'PSY', 'INT', 'DUAL', 'VS'] as const

export const CharacterClasses = [
  'Fighter',
  'Shooter',
  'Slasher',
  'Striker',
  'Free Spirit',
  'Cerebral',
  'Powerhouse',
  'Driven',
  'Evolver',
  'Booster',
] as const

export const Rarities = [1, 2, 3, 4, '4+', 5, '5+', 6, '6+'] as const

export const RumbleStyles = ['ATK', 'DEF', 'RCV', 'DBF', 'SPT'] as const

export const Potentials = [
  'Enrage/Reduce Increase Damage Taken duration',
  'Critical Hit',
  'Reduce Slot Bind duration',
  'Reduce No Healing duration',
  'Pinch Healing',
  'Barrier Penetration',
  '[STR] Damage Reduction',
  '[DEX] Damage Reduction',
  '[QCK] Damage Reduction',
  '[PSY] Damage Reduction',
  '[INT] Damage Reduction',
  'Cooldown Reduction',
  'Double Special Activation',
  'Reduce Ship Bind duration',
  'Reduce Sailor Despair duration',
  'Reduce Healing Reduction duration',
  'Nutrition/Reduce Hunger duration',
  'Last Tap',
] as const

export const PowerSockets = [
  'Damage Reduction',
  'Charge Specials',
  'Bind Resistance',
  'Despair Resistance',
  'Auto-Heal',
  'RCV Boost',
  'Slot Rate Boost',
  'Poison Resistance',
  'Map Damage Resistance',
  'Resilience',
] as const
