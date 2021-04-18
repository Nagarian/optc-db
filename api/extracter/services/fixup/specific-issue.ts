import { OldDB } from '../../models/old-db'

export function fixupSpecificIssue(
  unit: OldDB.ExtendedUnit,
  _index: number,
  _units: OldDB.ExtendedUnit[],
): OldDB.ExtendedUnit {
  fixWrongPotential(unit)
  fixGlobalOnlySailor(unit)
  fixFestResilience(unit)
  return unit
}

function fixWrongPotential(unit: OldDB.ExtendedUnit) {
  if (unit.id !== 1538) {
    return
  }

  if (unit.detail.limit?.[14].description.includes('Acquire Potential 2')) {
    // @ts-ignore
    unit.detail.limit[14].description = `Acquire Sailor Ability 2: ${unit.detail.sailor.level1}`
  } else {
    console.warn('issue with unit 1538 has been fixed')
  }
}

function fixGlobalOnlySailor(unit: OldDB.ExtendedUnit) {
  if (unit.id !== 3326) {
    return
  }

  // @ts-ignore
  if (unit.detail.sailor['global']) {
    // @ts-ignore
    unit.detail.sailor.base = 'global only: ' + unit.detail.sailor.global
    // @ts-ignore
    delete unit.detail.sailor.global
  }
}

function fixFestResilience(unit: OldDB.ExtendedUnit) {
  const detail = unit.detail as any

  if (detail.festResilience) {
    detail.festResistance = detail.festResilience
    delete detail.festResilience
  }
}

function removeProp(obj: any, badName: any, realName: any) {
  if (obj[badName]) {
    obj[realName] = obj[badName]
    delete obj[badName]
  }
}
