import Turndown from 'turndown'
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

export function extractFamily(unit: OldDB.ExtendedUnit): string[] {
  if (!unit.family) {
    return []
  }

  if (typeof unit.family === 'string') {
    return [unit.family]
  }

  return unit.family
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

// const isColorTypeRegex = /\[(STR|DEX|QCK|PSY|INT)\]/
// export const isColorType = (
//   value?: OldDB.PirateFest.ColorType | any,
// ): value is OldDB.PirateFest.ColorType => !!value && isColorTypeRegex.test(value)

// export const convertColorType = (
//   value: OldDB.PirateFest.ColorType,
// ): RawDB.ColorType => {
//   switch (value) {
//     case '[STR]':
//       return 'STR'
//     case '[DEX]':
//       return 'DEX'
//     case '[QCK]':
//       return 'QCK'
//     case '[PSY]':
//       return 'PSY'
//     case '[INT]':
//       return 'INT'
//   }
// }

// export const isEffectOverride = (
//   value: OldDB.PirateFest.Effect,
// ): value is OldDB.PirateFest.EffectOverride => 'override' in value || Object.keys(value).length === 0

// export const isCommonEffect = (
//   value: OldDB.PirateFest.Effect,
// ): value is OldDB.PirateFest.CommonEffect => 'effect' in value

// export const isAttackEffect = (
//   value: OldDB.PirateFest.Effect,
// ): value is OldDB.PirateFest.AttackEffectType => isCommonEffect(value) && value.effect === 'damage'

// export const isRechargeEffect = (
//   value: OldDB.PirateFest.Effect,
// ): value is OldDB.PirateFest.RechargeEffectType => isCommonEffect(value) && value.effect === 'recharge'
