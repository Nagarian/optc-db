import { OldDB } from '../models/old-db'

export function fixupSpecificIssue(
  unit: OldDB.ExtendedUnit,
  _index: number,
  _units: OldDB.ExtendedUnit[],
): OldDB.ExtendedUnit {
  fixWrongPotential(unit)
  fixRumbleFamilies(unit)
  fixHelmepCaptain(unit)
  fixKatakuriCaptain(unit)
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

  if (unit.id === 3546) {
    if (
      (unit.rumble?.special?.[0]?.effects?.[2] as OldDB.PirateFest.BasicEffect)
        ?.condition?.families?.[0] === 'Boa Hancock'
    ) {
      // @ts-ignore
      unit.rumble.special[0].effects[2].condition.families = ['BoaHancock', 'BoaSandersonia']
    } else {
      console.warn('issue with unit 3546 has been fixed')
    }
  }

  if (unit.id === 3561) {
    if (
      (unit.rumble?.special?.[0]?.effects?.[1] as OldDB.PirateFest.BasicEffect)
        ?.condition?.families?.[0] === 'Boa Marigold'
    ) {
      // @ts-ignore
      unit.rumble.special[0].effects[1].condition.families = ['BoaMarigold', 'BoaHancock']
    } else {
      console.warn('issue with unit 3546 has been fixed')
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

function fixHelmepCaptain(unit: OldDB.ExtendedUnit) {
  if (unit.id !== 3466) {
    return
  }

  if (typeof unit.detail.captain === 'string') {
    unit.detail.captain = {
      base: 'Boosts ATK of Slasher and Free Spirit characters by 3x',
      level1: unit.detail.captain
    }
  } else {
    console.warn('issue with unit 3466 should has been fixed')
  }
}

function fixKatakuriCaptain(unit: OldDB.ExtendedUnit) {
  if (unit.id !== 2739) {
    return
  }

  if (typeof unit.detail.captain === 'string') {
    unit.detail.captain = {
      base: unit.detail.captain,
      level1: 'Boosts ATK of Slasher, Striker, Driven, Cerebral and Powerhouse characters by 2x, reduces damage received by 20% and makes [STR], [PSY], [RCV] and [TND] orbs beneficial for all characters. Has a chance to delay all enemies by 1 turn based on damage dealt in previous turn.'
    }
  } else {
    console.warn('issue with unit 3466 should has been fixed')
  }
}

function removeProp(obj: any, badName: any, realName: any) {
  if (obj[badName]) {
    obj[realName] = obj[badName]
    delete obj[badName]
  }
}
