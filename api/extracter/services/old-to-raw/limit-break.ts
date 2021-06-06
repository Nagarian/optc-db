import { OldDB } from '../../models/old-db'
import { RawDB } from '../../models/raw-db'

export function extractLimitBreak(
  unit: OldDB.ExtendedUnit,
): RawDB.LB.LimitBreak | undefined {
  if (!unit.detail.limit?.length && !unit.detail.potential?.length)
    return undefined

  const potentials: RawDB.LB.Potential[] =
    unit.detail.potential?.map(p => ({
      type: p.Name,
      levels: p.description.map(desc => extractPotentialLevel(p.Name, desc)),
    })) ?? []

  const path =
    unit.detail.limit?.map(lb => extractLBPathLevel(lb.description)) ?? []

  return {
    path,
    potentials,
    lastTap: extractLastTap(unit),
  }
}

const potentialsRegex: Record<RawDB.LB.PotentialType, RegExp[]> = {
  'Enrage/Reduce Increase Damage Taken duration': [
    /^Boosts base ATK by (?<value>\d+|\?) the turn after taking damage and reduces Increase Damage Taken duration by (?<reduction>\d+|\?) turns?$/i,
    /^Boosts base ATK by (?<value>\d+|\?)$/i,
  ],
  'Critical Hit': [
    /^If you hit a PERFECT with this character, there is a (?<threshold>\d+|\?)% chance to deal (?<value>\d+|\?)% of this character's attack in extra damage$/i,
  ],
  'Reduce Slot Bind duration': [
    /^Reduces Slot Bind duration by (?<value>\d+|\?) turns? on this character$/i,
    /^Reduces Slot Bind duration (?<value>completely) on this character$/i,
  ],
  'Reduce No Healing duration': [
    /^Reduces No Healing duration by (?<value>\d+|\?) turns?$/i,
    /^If there are (?<threshold>\d+|\?) Shooter characters in your crew, reduces No Healing duration by (?<value>\d+|\?) turns?$/i,
  ],
  'Pinch Healing': [
    /^If HP is below (?<threshold>\d+|\?)% at the start of the turn, (recovers|heals for) (?<value>\d+\.?\d*|\?)x this character's RCV at the end of the turn each time you hit a PERFECT with this character$/i,
  ],
  'Barrier Penetration': [
    /^This character's normal attack will ignore barriers if HP is above (?<threshold>\d+|\?)% at the start of the turn$/i,
    /^This character's normal attack will ignore barriers(?<threshold>)$/i,
  ],
  '[STR] Damage Reduction': [
    /^Reduces? damage (taken|received) from \[?STR\]? (characters|enemies) by (?<value>\d+|\?)%$/i,
  ],
  '[DEX] Damage Reduction': [
    /^Reduces? damage (taken|received) from \[?DEX\]? (characters|enemies) by (?<value>\d+|\?)%$/i,
  ],
  '[QCK] Damage Reduction': [
    /^Reduces? damage (taken|received) from \[?QCK\]? (characters|enemies) by (?<value>\d+|\?)%$/i,
  ],
  '[PSY] Damage Reduction': [
    /^Reduces? damage (taken|received) from \[?PSY\]? (characters|enemies) by (?<value>\d+|\?)%$/i,
  ],
  '[INT] Damage Reduction': [
    /^Reduces? damage (taken|received) from \[?INT\]? (characters|enemies) by (?<value>\d+|\?)%$/i,
  ],
  'Cooldown Reduction': [
    /^Reduce own Special Cooldown by (?<value>\d+|\?) turns? at the start of the fight$/i,
  ],
  'Double Special Activation': [
    /^Once per an adventure, reduce own Special Cooldown by (?<value>\d+|\?) turns? after the first time this special is used$/i,
    /^Once per an adventure, sets your Special Gauge to (?<value>MAX) after the first time this special is used$/i,
  ],
  'Reduce Ship Bind duration': [
    /^Reduce Ship Bind duration by (?<value>\d+|\?) turns?$/i,
  ],
  'Reduce Sailor Despair duration': [
    /^Reduces? own Sailor Despair duration by (?<value>\d+|\?) turns?$/i,
    /^Reduces? Sailor Despair duration by (?<value>\d+|\?) turns?$/i,
  ],
  'Reduce Healing Reduction duration': [
    /^Reduces Healing Reduction duration by (?<value>\d+|\?) turns?$/i,
  ],
  'Nutrition/Reduce Hunger duration': [
    /^Boosts base ATK by (?<value>\d+|\?) the turn after recovering (?<threshold>\d+,?\d*|\?) HP and reduces Hunger stack by (?<reduction>\d+|\?) stacks?$/i,
  ],
  'Last Tap': [/^Last Tap Ability Lv.(?<value>\d+|\?)$/i],
}
function extractPotentialLevel(
  type: RawDB.LB.PotentialType,
  potentialDesc: string,
): RawDB.LB.PotentialLevel {
  const regexes = potentialsRegex[type]

  const matchingRegex = regexes.find(regex => regex.test(potentialDesc))

  if (!matchingRegex) {
    throw new Error(`can't parse this potential: ${potentialDesc}`)
  }

  const result = matchingRegex.exec(potentialDesc)

  const mapper = (value?: string) => {
    switch (value) {
      case '?':
        return undefined
      case 'MAX':
      case 'completely':
        return 99
      case '':
        return 0
      default:
        return value ? parseFloat(value.replace(',', '')) : undefined
    }
  }

  return {
    value: mapper(result?.groups?.value),
    threshold: mapper(result?.groups?.threshold),
    reduction: mapper(result?.groups?.reduction),
  }
}

const lbPathRegex: Record<RawDB.LB.PathType, RegExp> = {
  atk: /Boosts base ATK by (\d+|\?)/i,
  hp: /Boosts base HP by (\d+|\?)/i,
  rcv: /Boosts base RCV by (\d+|\?)/i,
  key: /LOCKED WITH KEY/i,
  slot: /Acquire (\d+|\?) additional Socket slot/i,
  cooldown: /Reduce base Special Cooldown by (\d+|\?)( turns?)?/i,
  potential: /Acquire Potential [1-9]: .*/i,
  sailor: /Acquire Sailor Ability [1-9#]?: .*/,
  captain: /Acquire new Captain Ability: .*/i,
}
function extractLBPathLevel(pathLevelDesc: string): RawDB.LB.Path {
  const entry = Object.entries(lbPathRegex).find(([key, regex]) =>
    regex.test(pathLevelDesc),
  ) as [RawDB.LB.PathType, RegExp] | undefined

  if (!entry) {
    throw new Error(`can't parse this LBPath: ${pathLevelDesc}`)
  }

  const [type, regex] = entry
  const value = regex.exec(pathLevelDesc)![1]

  if (['atk', 'hp', 'rcv', 'slot', 'cooldown'].includes(type)) {
    return {
      type,
      value: value === '?' ? undefined : parseInt(value),
    }
  }

  return {
    type,
  }
}

function extractLastTap(
  unit: OldDB.ExtendedUnit,
): RawDB.LB.LastTap | undefined {
  if (!unit.detail.lastTap) {
    return undefined
  }

  if (unit.detail.lastTap.length > 1) {
    throw new Error('More than 1 last tap detected')
  }

  const lastTap = unit.detail.lastTap[0]

  return {
    criteria: lastTap.condition,
    levels: lastTap.description.map(str => ({ description: str })),
    notes: unit.detail.lastTapNotes || undefined,
  }
}
