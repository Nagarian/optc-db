import { RawDB } from '../../raw-db/models/raw-db'
import { FinalDB } from '../models/final-db'

export function computeDBEvolutions(
  db: RawDB.DBCharacter[],
): Record<number, FinalDB.Evolution> {
  const result: Record<number, FinalDB.Evolution> = {}
  const seekerMap: Record<number, number[]> = {}

  for (const [id, { evolution }] of db) {
    if (!evolution) continue

    seekerMap[id] ??= []

    for (const evol of evolution) {
      seekerMap[evol.id] ??= []
      seekerMap[evol.id].push(id)
    }

    const from: FinalDB.EvolutionCharacter[] | undefined =
      seekerMap[id].length == 0
        ? undefined
        : seekerMap[id]
            .flatMap(evolId =>
              db
                .find(([dbid]) => dbid === evolId)![1]
                .evolution!.map(e => ({ ...e, evolId })),
            )
            .filter(e => e.id === id)
            .map(({ id, evolId, evolvers }) => ({ id: evolId, evolvers }))

    seekerMap[id].push(id)

    result[id] = {
      from,
      map: seekerMap[id],
      to: evolution,
    }
  }

  return result
}
