import { OldDB } from '../../models/old-db'
import {
  globalOnly,
  globalOnlyMissingInDb,
  globalOnlyReverseMap,
} from '../global-only'
import { isGloJapSpecial } from '../old-to-raw/special'

export function addGloOnly(db: OldDB.ExtendedUnit[]): OldDB.ExtendedUnit[] {
  return db
    .filter(u => !!globalOnlyMissingInDb[u.id])
    .map(u => ({ ...u, id: globalOnlyMissingInDb[u.id] }))
}

export function fixupSuperEvolutionMap(
  unit: OldDB.ExtendedUnit,
  _index: number,
  _units: OldDB.ExtendedUnit[],
): OldDB.ExtendedUnit {
  return (
    fixSuperEvolution_Lucci(unit) ??
    fixSuperEvolution_Robin(unit) ??
    fixSuperEvolution_SaboDex(unit) ??
    unit
  )
}

function fixSuperEvolution_Lucci(
  unit: OldDB.ExtendedUnit,
): OldDB.ExtendedUnit | undefined {
  if (!unit.evolutionMap?.includes(2784)) {
    return undefined
  }

  if (unit.dbId === 1763) {
    return {
      ...unit,
      evolutionMap: [...unit.evolutionMap, 5016],
      evolution: {
        evolution: [2784, 5016],
        evolvers: [
          ['skullQCK', 'skullQCK', 'skullQCK', 1180, 301],
          ['skullQCK', 'skullQCK', 'skullQCK', 1180, 301],
        ],
      },
    }
  }

  return {
    ...unit,
    evolutionMap: [...unit.evolutionMap, 5016],
  }
}

function fixSuperEvolution_Robin(
  unit: OldDB.ExtendedUnit,
): OldDB.ExtendedUnit | undefined {
  if (!unit.evolutionMap?.includes(2830)) {
    return undefined
  }

  if (unit.dbId === 1951) {
    return {
      ...unit,
      evolutionMap: [...unit.evolutionMap, 5062],
      evolution: {
        evolution: [2830, 5062],
        evolvers: [
          ['skullPSY', 'skullINT', 99, 304, 267],
          ['skullPSY', 'skullINT', 99, 304, 267],
        ],
      },
    }
  }

  return {
    ...unit,
    evolutionMap: [...unit.evolutionMap, 5062],
  }
}

function fixSuperEvolution_SaboDex(unit: OldDB.ExtendedUnit) {
  if (unit.id === 5022) {
    if (unit.evolution) {
      unit.evolution = undefined
    } else {
      console.warn('issue with unit 5022 has been fixed')
    }
  }

  return unit
}

export function fixupGloOnlyImages(
  unit: OldDB.ExtendedUnit,
  _index: number,
  _units: OldDB.ExtendedUnit[],
): OldDB.ExtendedUnit {
  if (unit.id < 5001) {
    return unit
  }

  return {
    ...unit,
    images: {
      ...unit.images,
      thumbnail: undefined,
    },
  }
}

export function fixupGloOnlyEvolution(
  unit: OldDB.ExtendedUnit,
  _index: number,
  _units: OldDB.ExtendedUnit[],
): OldDB.ExtendedUnit {
  if (unit.id < 5001) {
    return unit
  }

  return {
    ...unit,
    evolutionMap: unit.evolutionMap.map(id => globalOnlyReverseMap[id] ?? id),
    evolution: unit.evolution && {
      ...unit.evolution,
      evolution: Array.isArray(unit.evolution.evolution)
        ? unit.evolution.evolution.map(id => globalOnlyReverseMap[id])
        : globalOnlyReverseMap[unit.evolution.evolution],
    },
  }
}

export function fixupGloOnlyFlags(
  unit: OldDB.ExtendedUnit,
  _index: number,
  _units: OldDB.ExtendedUnit[],
): OldDB.ExtendedUnit {
  return {
    ...unit,
    flags: {
      ...unit.flags,
      gloOnly: globalOnly[unit.id] ? 1 : undefined,
      japOnly: globalOnlyMissingInDb[unit.id] ? 1 : undefined,
    },
  }
}

export function fixupGloJapSpecial(
  unit: OldDB.ExtendedUnit,
  _index: number,
  _units: OldDB.ExtendedUnit[],
): OldDB.ExtendedUnit {
  if (!isGloJapSpecial(unit.detail.special)) {
    return unit
  }

  if (globalOnly[unit.id]) {
    return {
      ...unit,
      detail: {
        ...unit.detail,
        special: unit.detail.special.global,
      },
    }
  }

  if (globalOnlyReverseMap[unit.id]) {
    return {
      ...unit,
      detail: {
        ...unit.detail,
        special: unit.detail.special.japan,
      },
    }
  }

  return unit
}
