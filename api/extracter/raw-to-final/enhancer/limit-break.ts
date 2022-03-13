import { RawDB } from '../../raw-db/models/raw-db'
import { numberToString } from '../helper'
import { FinalDB } from '../models/final-db'

export function enhanceLimitBreak(
  limitBreak: RawDB.LB.LimitBreak | undefined,
): FinalDB.LB.LimitBreak | undefined {
  if (!limitBreak) return undefined

  return {
    path: limitBreak?.path,
    potentials: limitBreak.potentials.map(enhancePotential),
    lastTap: limitBreak.lastTap,
  }
}

function enhancePotential(potential: RawDB.LB.Potential): FinalDB.LB.Potential {
  return {
    type: potential.type,
    variant: potential.variant,
    levels: potential.levels.map(level => ({
      description: enhancePotentialLevel(potential, level),
      ...level,
    })),
  }
}

type DescriptionUnit = 'turn' | '%' | 'number' | 'x'

type DescriptionPotential = {
  desc: string
  variantDesc?: string
  valueUnit?: DescriptionUnit
  reductionUnit?: DescriptionUnit
  thresholdUnit?: DescriptionUnit
}

const potentialsDescription: Record<
  RawDB.LB.PotentialType,
  DescriptionPotential
> = {
  'Enrage/Reduce Increase Damage Taken duration': {
    desc: 'Boosts base ATK <value> the turn after taking damage and reduces Increase Damage Taken duration <reduction>',
    valueUnit: 'number',
    reductionUnit: 'turn',
  },
  'Critical Hit': {
    desc: `If you hit a PERFECT with this character, there is <threshold> chance to deal <value> of this character's attack in extra damage`,
    valueUnit: '%',
    thresholdUnit: '%',
  },
  'Reduce Slot Bind duration': {
    desc: 'Reduces Slot Bind duration <value> on this character',
    valueUnit: 'turn',
  },
  'Reduce No Healing duration': {
    desc: 'Reduces No Healing duration <value>',
    variantDesc:
      'If there are <threshold> Shooter characters in your crew, reduces No Healing duration <value>',
    valueUnit: 'turn',
    thresholdUnit: 'number',
  },
  'Pinch Healing': {
    desc: `If HP is below <threshold> at the start of the turn, recovers <value> this character's RCV at the end of the turn for each time you hit a PERFECT with this character`,
    thresholdUnit: '%',
    valueUnit: 'x',
  },
  'Barrier Penetration': {
    desc: `This character's normal attack will ignore barriers if HP is above <threshold> at the start of the turn`,
    variantDesc: `This character's normal attack will ignore barriers`,
    thresholdUnit: '%',
  },
  '[STR] Damage Reduction': {
    desc: 'Reduce damage taken from [STR] characters by <value>',
    valueUnit: '%',
  },
  '[DEX] Damage Reduction': {
    desc: 'Reduce damage taken from [DEX] characters by <value>',
    valueUnit: '%',
  },
  '[QCK] Damage Reduction': {
    desc: 'Reduce damage taken from [QCK] characters by <value>',
    valueUnit: '%',
  },
  '[PSY] Damage Reduction': {
    desc: 'Reduce damage taken from [PSY] characters by <value>',
    valueUnit: '%',
  },
  '[INT] Damage Reduction': {
    desc: 'Reduce damage taken from [INT] characters by <value>',
    valueUnit: '%',
  },
  'Cooldown Reduction': {
    desc: 'Reduce own Special Cooldown <value> at the start of the fight',
    valueUnit: 'turn',
  },
  'Double Special Activation': {
    desc: 'Once per adventure, reduce own Special Cooldown <value> after the first time this special is used',
    valueUnit: 'turn',
  },
  'Reduce Ship Bind duration': {
    desc: 'Reduce Ship Bind duration <value>',
    valueUnit: 'turn',
  },
  'Reduce Sailor Despair duration': {
    desc: 'Reduce own Sailor Despair duration <value>',
    valueUnit: 'turn',
  },
  'Reduce Special Use Limit duration': {
    desc: 'Reduces Special Limit duration <value>',
    valueUnit: 'turn',
  },
  'Reduce Healing Reduction duration': {
    desc: 'Reduce Healing Reduction duration <value>',
    valueUnit: 'turn',
  },
  'Nutrition/Reduce Hunger duration': {
    desc: 'Boosts base ATK by <value> the turn after recovering <threshold> HP and reduces Hunger stack <reduction>',
    variantDesc:
      'Boosts base ATK by up to <value> the turn after recovering up to <threshold> HP and reduces Hunger stack <reduction>',
    valueUnit: 'turn',
  },
  'Last Tap': {
    desc: 'Last Tap Ability Lv.<value>',
    valueUnit: 'number',
  },
  'Reduce Slot Barrier duration': {
    desc: 'Reduces Slot Barrier duration <value> on this character',
    valueUnit: 'turn',
  },
}

function computeDescriptionUnit(
  value: number | undefined,
  unit: DescriptionUnit | undefined,
): string | undefined {
  switch (unit) {
    case '%':
      return `${value ?? '?'}%`
    case 'number':
      return value ? numberToString(value) : '?'
    case 'turn':
      return value === 100
        ? 'completely'
        : `by ${value ?? '?'} turn${value ?? 0 > 1 ? 's' : ''}`
    case 'x':
      return `${value ?? '?'}x`
    case undefined:
      return undefined
    default:
      throw new Error('Unhandled unit description')
  }
}

function enhancePotentialLevel(
  potential: RawDB.LB.Potential,
  level: RawDB.LB.PotentialLevel,
): string {
  const desc = potentialsDescription[potential.type]

  if (potential.type === 'Barrier Penetration' && level.value === 100) {
    return desc.variantDesc!
  }

  let descStr =
    potential.variant === 'up to' ? desc.variantDesc ?? desc.desc : desc.desc

  const v = (
    reg: RegExp,
    value: number | undefined,
    unit: DescriptionUnit | undefined,
  ) => {
    const unitDesc = computeDescriptionUnit(value, unit)
    if (!unitDesc) {
      return
    }

    descStr = descStr.replace(reg, unitDesc)
  }

  v(/<value>/, level.value, desc.valueUnit)
  v(/<reduction>/, level.reduction, desc.reductionUnit)
  v(/<threshold>/, level.threshold, desc.thresholdUnit)

  return descStr
}
