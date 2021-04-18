import { OldDB } from '../../models/old-db'
import { RawDB } from '../../models/raw-db'

export const isSimpleClass = (value: OldDB.UnitClass): value is OldDB.Class =>
  typeof value === 'string'

export const isMultiClass = (
  value: OldDB.UnitClass,
): value is OldDB.MultiClass =>
  Array.isArray(value) && value.length === 2 && !Array.isArray(value[0])

export const isDualClass = (value: OldDB.UnitClass): value is OldDB.DualClass =>
  Array.isArray(value) && value.length === 3 && Array.isArray(value[0])

export const isVersusClass = (
  value: OldDB.UnitClass,
): value is OldDB.VersusClass =>
  Array.isArray(value) && value.length === 2 && Array.isArray(value[0])

export function extractClass(
  unit: OldDB.ExtendedUnit,
  returnMain: boolean = false,
): RawDB.Class {
  if (isSimpleClass(unit.class)) {
    return [unit.class]
  }

  if (isMultiClass(unit.class)) {
    return unit.class
  }

  if (!returnMain) {
    throw new Error(`unit ${unit.id} "${unit.name}" has no class`)
  }
  
  if (isDualClass(unit.class)) {
    return unit.class[0]
  }

  if (isVersusClass(unit.class)) {
    return []
  }

  return []
}

export function extractType(unit: OldDB.ExtendedUnit): RawDB.Type {
  const unitType = !Array.isArray(unit.type) ? unit.type : undefined

  if (unitType === undefined) {
    throw new Error(`unit ${unit.id} "${unit.name}" has no class`)
  }

  return unitType
}

export function extractRealType(unit: OldDB.ExtendedUnit): RawDB.Type {
  if (!Array.isArray(unit.type)) {
    return unit.type
  }

  if (unit.detail.VSCondition) {
    return 'VS'
  }

  return 'DUAL'
}

export function extractFamily(unit: OldDB.ExtendedUnit): string[] {
  if (!unit.family) {
    return []
  }

  if (typeof unit.family === 'string') {
    return [unit.family]
  }

  return unit.family
}
