import { RawDB } from '../../raw-db/models/raw-db'
import { FinalDB } from '../models/final-db'

export function enhanceSailor(
  sailor: RawDB.Sailor[] | undefined,
  limitBreak: RawDB.LB.LimitBreak | undefined,
): FinalDB.Sailor[] | undefined {
  if (!sailor) return undefined

  if (!limitBreak || !limitBreak.path.length) return sailor

  const sailorIndexes = limitBreak.path
    .map<[number, RawDB.LB.Path]>((p, i) => [i, p])
    .filter(([i, p]) => p.type === 'sailor')
    .map(([i]) => i)
    .reverse()

  if (sailorIndexes.length > sailor.length) {
    throw new Error(
      'they are more LB sailor node than sailor declared on this unit',
    )
  }

  return [...sailor]
    .reverse()
    .map((sailor, i) => ({ ...sailor, unlockedAt: sailorIndexes[i] }))
    .reverse()
}
