import { OldDB } from '../models/old-db'
import { RawDB } from '../../raw-db/models/raw-db'
import { EvolutionSkulls } from '../../raw-db/models/raw-constant'

export function extractEvolution(
  unit: OldDB.ExtendedUnit,
): RawDB.Evolution[] | undefined {
  if (!unit.evolution) return undefined

  if (Array.isArray(unit.evolution.evolution)) {
    return unit.evolution.evolution.map((u, i) => ({
      id: u,
      evolvers: remapEvolutionMaterials(unit.evolution?.evolvers[i] as OldDB.UnitEvolverMaterial[]),
    }))
  }

  return [
    {
      id: unit.evolution.evolution,
      evolvers: remapEvolutionMaterials(unit.evolution.evolvers as OldDB.UnitEvolverMaterial[]),
    },
  ]
}

function remapEvolutionMaterials(
  oldEvolver: OldDB.UnitEvolverMaterial[],
): RawDB.EvolutionMaterial[] {
  return oldEvolver.map(e =>
    typeof e == 'string' && e.startsWith('skull') && !EvolutionSkulls.includes(e as any) ? 'skull' : e,
  ) as RawDB.EvolutionMaterial[]
}
