import Turndown from 'turndown'
import { OldDB } from '../models/old-db'
import { RawDB } from '../../raw-db/models/raw-db'

export const isSimpleClass = (value: OldDB.UnitClass): value is OldDB.Class =>
  typeof value === 'string'

export const isMultiClass = (
  value: OldDB.UnitClass,
): value is OldDB.MultiClass =>
  Array.isArray(value) && value.length === 2 && !Array.isArray(value[0])

export const isDualClass = (value: OldDB.UnitClass): value is OldDB.DualClass =>
  Array.isArray(value) && value.length === 3 && !!value[0]

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
    return isSimpleClass(unit.class[0]) ? [unit.class[0]] : unit.class[0]
  }

  if (isVersusClass(unit.class)) {
    return []
  }

  return []
}

export function extractColorType(unit: OldDB.ExtendedUnit): RawDB.ColorType {
  const unitType = !Array.isArray(unit.type) ? unit.type : undefined

  if (unitType === undefined) {
    throw new Error(`unit ${unit.id} "${unit.name}" has no class`)
  }

  return unitType as RawDB.ColorType
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

export function extractFrenchName(
  unit: OldDB.ExtendedUnit,
): string | undefined {
  return unit.aliases?.[1] || undefined
}

export function extractJapanName(unit: OldDB.ExtendedUnit): string | undefined {
  return unit.aliases?.[0] || undefined
}

export function cleanHmtl(description: string) {
  var t = new Turndown({ bulletListMarker: '-' })
  return t
    .turndown(description)
    .replace(/\\\[/gi, '[')
    .replace(/\\\]/gi, ']')
    .trim()
}
