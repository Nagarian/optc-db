import { RawDB } from '../../raw-db/models/raw-db'
import { FinalDB } from '../models/final-db'

export function enhanceCaptain(
  captain: RawDB.Captain | undefined,
  limitBreak: RawDB.LB.LimitBreak | undefined,
): FinalDB.Captain | undefined {
  if (!captain) return undefined

  if (!limitBreak || !limitBreak.path.length) {
    return {
      name: captain.name,
      description: captain.baseDescription,
      notes: captain.notes,
    }
  }

  const captainUpgradeIndexes = limitBreak.path
    .map<[number, RawDB.LB.Path]>((p, i) => [i, p])
    .filter(([i, p]) => p.type === 'captain')
    .map(([i]) => i)
    .reverse()

  if (!captainUpgradeIndexes.length && !captain.upgrades?.length) {
    return {
      name: captain.name,
      description: captain.baseDescription,
      notes: captain.notes,
    }
  }

  if (captainUpgradeIndexes.length > (captain.upgrades?.length ?? 0)) {
    throw new Error(
      'they are more LB captain node than captain upgrade declared on this unit',
    )
  }

  let keyIndex = limitBreak.path.findIndex(p => p.type === 'key')
  if (keyIndex === -1) {
    keyIndex = 99999
  }

  const upgrades: FinalDB.CaptainUpgrade[] = [
    { description: captain.baseDescription },
    ...captain.upgrades!,
  ]
    .reverse()
    .map(({ description }, i) => ({
      description,
      unlockedAt: captainUpgradeIndexes[i] ?? 0,
      keyLocked: (captainUpgradeIndexes[i] ?? 0) > keyIndex,
    }))
    .reverse()

  return {
    name: captain.name,
    description: upgrades[upgrades.length - 1].description,
    notes: captain.notes,
    upgrades,
  }
}
