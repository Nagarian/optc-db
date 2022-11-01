import { OldDB } from '../models/old-db'

export function fixupSpecificIssue(
  unit: OldDB.ExtendedUnit,
  _index: number,
  _units: OldDB.ExtendedUnit[],
): OldDB.ExtendedUnit {
  fixWrongPotential(unit)
  fixRumbleFamilies(unit)
  fixllbbase(unit)
  fixRumbleResilience(unit)
  fixCaptinNotes(unit)
  fixHelmeppoCaptain(unit)
  fixRumbleGpConditionAttack(unit)
  fixRumbleGpConditionEnemy(unit)
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
      console.warn(`issue with unit ${unit.id} should has been fixed`)
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
      console.warn(`issue with unit ${unit.id} should has been fixed`)
    }
  }

  if (unit.id === 3546) {
    if (
      (unit.rumble?.special?.[0]?.effects?.[2] as OldDB.PirateFest.BasicEffect)
        ?.condition?.families?.[0] === 'Boa Hancock'
    ) {
      // @ts-ignore
      unit.rumble.special[0].effects[2].condition.families = [
        'BoaHancock',
        'BoaSandersonia',
      ]
    } else {
      console.warn(`issue with unit ${unit.id} should has been fixed`)
    }
  }

  if (unit.id === 3561) {
    if (
      (unit.rumble?.special?.[0]?.effects?.[1] as OldDB.PirateFest.BasicEffect)
        ?.condition?.families?.[0] === 'Boa Marigold'
    ) {
      // @ts-ignore
      unit.rumble.special[0].effects[1].condition.families = [
        'BoaMarigold',
        'BoaHancock',
      ]
    } else {
      console.warn(`issue with unit ${unit.id} should has been fixed`)
    }
  }

  if (unit.id === 3745) {
    if (
      (unit.rumble?.special?.[0]?.effects?.[2] as OldDB.PirateFest.BasicEffect)
        ?.condition?.families?.[0] === 'Kozuki Oden'
    ) {
      // @ts-ignore
      unit.rumble.special[0].effects[2].condition.families = ['KozukiOden']
      // @ts-ignore
      unit.rumble.gpspecial[0].effects[1].condition.families = ['KozukiOden']
    } else {
      console.warn(`issue with unit ${unit.id} should has been fixed`)
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
    console.warn(`issue with unit ${unit.id} should has been fixed`)
  }
}

function fixllbbase(unit: OldDB.ExtendedUnit) {
  if (unit.id !== 1413 && unit.id !== 1816) {
    return
  }

  // @ts-ignore
  if (unit.detail.special.level1) {
    // @ts-ignore
    unit.detail.special.llbbase = unit.detail.special.level1
    // @ts-ignore
    delete unit.detail.special.level1
  } else {
    console.warn(`issue with unit ${unit.id} should has been fixed`)
  }
}

function fixRumbleResilience(unit: OldDB.ExtendedUnit) {
  if (unit.id !== 3731) {
    return
  }

  // @ts-ignore
  if (unit.rumble?.resilience[0].attribute == 'Special Bind') {
    // @ts-ignore
    unit.rumble.resilience[0].attribute = 'Silence'
  } else {
    console.warn(`issue with unit ${unit.id} should has been fixed`)
  }
}

function fixRumbleGpConditionEnemy(unit: OldDB.ExtendedUnit) {
  if (unit.id !== 2534 && unit.id !== 3721) {
    return
  }

  // @ts-ignore
  if (unit.rumble?.gpcondition[0].team === 'enemy') {
    // @ts-ignore
    unit.rumble.gpcondition[0].team = 'enemies'
  } else {
    console.warn(`issue with unit ${unit.id} should has been fixed`)
  }
}

function fixRumbleGpConditionAttack(unit: OldDB.ExtendedUnit) {
  if (unit.id !== 3695) {
    return
  }

  // @ts-ignore
  if (unit.rumble?.gpcondition[0].attack === 'non-Special') {
    // @ts-ignore
    unit.rumble.gpcondition[0].attack = 'Normal'
  } else {
    console.warn(`issue with unit ${unit.id} should has been fixed`)
  }
}

function fixHelmeppoCaptain(unit: OldDB.ExtendedUnit) {
  if (unit.id !== 3466) {
    return
  }

  // @ts-ignore
  if (!unit.detail.captain.level1) {
    unit.detail.captain = {
      base: 'Boosts ATK of Slasher and Free Spirit characters by 3x',
      // @ts-ignore
      level1: unit.detail.captain.base,
    }
  } else {
    console.warn(`issue with unit ${unit.id} should has been fixed`)
  }
}

function fixCaptinNotes(unit: OldDB.ExtendedUnit) {
  if (unit.id !== 3719 && unit.id !== 3720) {
    return
  }

  // @ts-ignore
  if (unit.detail.captinNotes) {
    // @ts-ignore
    unit.detail.captainNotes = unit.detail.captinNotes
    // @ts-ignore
    delete unit.detail.captinNotes
  } else {
    console.warn(`issue with unit ${unit.id} should has been fixed`)
  }
}

function removeProp(obj: any, badName: any, realName: any) {
  if (obj[badName]) {
    obj[realName] = obj[badName]
    delete obj[badName]
  }
}
