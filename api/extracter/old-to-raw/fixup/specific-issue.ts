import { OldDB } from '../models/old-db'

export function fixupSpecificIssue(
  unit: OldDB.ExtendedUnit,
  _index: number,
  _units: OldDB.ExtendedUnit[],
): OldDB.ExtendedUnit {
  fixWrongPotential(unit)
  fixRumbleFamilies(unit)
  return unit
}

function fixRumbleFamilies(unit: OldDB.ExtendedUnit) {
  if (unit.id === 3534) {
    if (
      (unit.rumble?.ability?.[0]?.effects?.[1] as OldDB.PirateFest.BasicEffect)
        ?.condition?.families?.[0] === 'Cat Viper'
    ) {
      // @ts-ignore
      unit.rumble.ability[0].effects[1].condition.families = ['Nekomamushi']
      // @ts-ignore
      unit.rumble.special[0].effects[3].condition.families = ['Nekomamushi']
    } else {
      console.warn('issue with unit 3534 has been fixed')
    }
  }

  if (unit.id === 3536) {
    if (
      (unit.rumble?.ability?.[0]?.effects?.[3] as OldDB.PirateFest.BasicEffect)
        ?.condition?.families?.[0] === 'Dogstorm'
    ) {
      // @ts-ignore
      unit.rumble.ability[0].effects[3].condition.families = ['Inuarashi']
      // @ts-ignore
      unit.rumble.special[0].effects[1].condition.families = ['Inuarashi']
    } else {
      console.warn('issue with unit 3536 has been fixed')
    }
  }
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

function removeProp(obj: any, badName: any, realName: any) {
  if (obj[badName]) {
    obj[realName] = obj[badName]
    delete obj[badName]
  }
}
