import { OldDB } from '../models/old-db'
import { DBevolution } from './db-loader'

type EvolutionMapHash = Record<number, number[]>

export function getEvolutionMap(): EvolutionMapHash {
  const evolutionHash: EvolutionMapHash = {}

  for (const key in DBevolution) {
    const id = parseInt(key)

    if (evolutionHash[id]) continue

    const evolutionForward = evolutionSeeker(DBevolution, id)
    for (const evolveId of evolutionForward) {
      evolutionHash[evolveId] = evolutionForward
    }
  }

  return evolutionHash
}

function evolutionSeeker(evols: OldDB.BaseUnitEvolution, id: number): number[] {
  const evolutionForward = evols[id]
  const result = [id]

  if (!evolutionForward) {
    return result
  }

  if (Array.isArray(evolutionForward.evolution)) {
    return evolutionForward.evolution.reduce(
      (all, evolveId) => all.concat(evolutionSeeker(evols, evolveId)),
      result,
    )
  }

  return result.concat(evolutionSeeker(evols, evolutionForward.evolution))
}
