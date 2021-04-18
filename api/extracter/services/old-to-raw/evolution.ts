import { OldDB } from '../../models/old-db'
import { RawDB } from '../../models/raw-db'

export function extractEvolution(
  unit: OldDB.ExtendedUnit,
): RawDB.Evolution[] | undefined {
  if (!unit.evolution) return undefined

  if (Array.isArray(unit.evolution.evolution)) {
    return unit.evolution.evolution.map((u, i) => ({
      id: u,
      evolvers: (unit.evolution?.evolvers[i] ??
        []) as RawDB.EvolutionMaterial[],
    }))
  }

  return [
    {
      id: unit.evolution.evolution,
      evolvers: unit.evolution.evolvers as RawDB.EvolutionMaterial[],
    },
  ]
}
