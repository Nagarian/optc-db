import { RawDB } from '../../raw-db/models/raw-db'
import { FinalDB } from '../models/final-db'

export function enhanceSpecial(
  special: RawDB.Special | undefined,
  limitBreak: RawDB.LB.LimitBreak | undefined,
): FinalDB.Special | undefined {
  if (!special) return undefined

  const cooldown = computeSpecialCooldown(special, limitBreak?.path ?? [])

  return {
    name: special.name,
    description: special.description,
    cooldown,
    maxLevel: special.maxLevel ?? 0,
    notes: special.notes,
    stages: special.stages?.map(s => computeSpecialStage(cooldown, s)),
  }
}

function computeSpecialCooldown(
  special: RawDB.Special,
  limitBreakPath: RawDB.LB.Path[],
): FinalDB.SpecialCooldown {
  let keyLvl = limitBreakPath.findIndex(p => p.type === 'key')
  if (keyLvl === -1) {
    keyLvl = limitBreakPath.length
  }

  const initial = special.cooldown ?? 0
  const max = initial - (special.maxLevel ?? 0)
  const lbMax = limitBreakPath
    .filter((p, i) => p.type === 'cooldown' && i < keyLvl)
    .reduce((acc, cur) => acc - (cur.value ?? 0), max)
  const keyLbMax = limitBreakPath
    .filter(p => p.type === 'cooldown')
    .reduce((acc, cur) => acc - (cur.value ?? 0), max)

  return {
    initial,
    max,
    lbMax: limitBreakPath.length > 0 ? lbMax : undefined,
    keyLbMax: keyLvl !== limitBreakPath.length ? keyLbMax : undefined,
  }
}

function computeSpecialStage(
  special: FinalDB.SpecialCooldown,
  stage: RawDB.SpecialStage,
): FinalDB.SpecialStage {
  const delta = special.initial - stage.cooldown

  return {
    cooldown: {
      initial: stage.cooldown,
      max: special.max - delta,
      lbMax: special.lbMax ? special.lbMax - delta : undefined,
      keyLbMax: special.keyLbMax ? special.keyLbMax - delta : undefined,
    },
    description: stage.description,
  }
}
