import { OldDB } from '../../models/old-db'
import { extractRealType } from '../old-to-raw/old-db-helper'

export function fixupVersusUnit(unit: OldDB.ExtendedUnit): OldDB.ExtendedUnit {
  if (!unit.detail.VSCondition) {
    return unit
  }

  const untyped: any = unit

  const duplicated = {
    ...unit,
    pirateFest: undefined,
    detail: {
      ...untyped.detail,
      festAbility: undefined,
      festSpecial: undefined,
      festAttackPattern: undefined,
      festAttackTarget: undefined,
      festResistance: undefined,
    },
  }

  if (extractRealType(unit) === 'VS') {
    duplicated.detail.captain = undefined
    duplicated.detail.sailor = undefined
    duplicated.detail.VSSpecial = undefined
  }

  return duplicated
}
