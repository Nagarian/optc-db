import { OldDB } from '../../models/old-db'
import { RawDB } from '../../models/raw-db'

export function extractStats(unit: OldDB.ExtendedUnit): RawDB.Statistics {
  return {
    combo: unit.combo || 0,
    minLvl: {
      hp: unit.minHP || 0,
      atk: unit.minATK || 0,
      rcv: unit.minRCV || 0,
    },
    maxLvl: {
        hp: unit.maxHP || 0,
      atk: unit.maxATK || 0,
      rcv: unit.maxRCV || 0,
    },
  }
}
