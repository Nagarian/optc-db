import { OldDB } from '../../models/old-db'

export function fixupVersusUnit(unit: OldDB.ExtendedUnit): OldDB.ExtendedUnit {
  if (!unit.detail.VSCondition) {
    return unit
  }

  const untyped: any = unit

  return {
    ...unit,
    pirateFest: undefined,
    detail: {
      ...untyped.detail,
      captain: undefined,
      sailor: undefined,
      festAbility: undefined,
      festSpecial: undefined,
      festAttackPattern: undefined,
      festAttackTarget: undefined,
      festResistance: undefined,
      VSSpecial: undefined
    },
  }
}
