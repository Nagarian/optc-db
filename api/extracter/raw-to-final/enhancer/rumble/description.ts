import { RawDB } from '../../../raw-db/models/raw-db'
import { arrayToString, numberToString } from '../../helper'

// copy from characters/js/directives.js

export function targetToStringMain(
  input: RawDB.PirateRumble.TargetClass,
): string {
  if (!input) return 'N/A'
  if (input.criteria === 'near') {
    return 'Nearby Enemies.'
  } else {
    return `Enemies with the ${input.comparator} ${input.criteria}.`
  }
}

export function patternToString(input: RawDB.PirateRumble.Pattern): string {
  if (!input) return 'N/A'
  if (input.action === 'attack') {
    switch (input.type) {
      case 'Normal':
        return `${input.type} Attack`
      case 'Power':
        return `**${input.type} Attack**`
      case 'Full':
        return `**${input.type} Attack**`
      default:
        return ''
    }
  } else if (input.action === 'heal') {
    return `*Level ${input.level} ${
      input.area === 'Self' ? input.area : input.area + ' Range'
    } Heal*`
  }

  throw new Error('UNKNOWN')
}

export function resilienceToString(
  input: RawDB.PirateRumble.Resilience,
): string {
  if (!input) return 'N/A'

  if (input.type == 'healing') {
    return `${conditionToString(input.condition)}Heals ${
      input.amount
    } HP every ${input.interval} seconds.`
  }

  if (input.type === 'damage') {
    return `${input.percentage}% reduction to ${input.attribute} damage.`
  }

  return `${input.chance}% to resist ${input.attribute}.`
}

export function abilityEffectToString(
  effect: RawDB.PirateRumble.Effect,
): string {
  if (!effect) return ''

  if (!('effect' in effect)) {
    return ''
  }

  return [
    conditionToString(effect.condition),
    effectToString(effect),
    targetToString(effect.targeting),
    rangeToString(effect.range),
    effect.duration ? `for ${effect.duration} second` : '',
    effect.repeat ? `${numberToString(effect.repeat)} times` : '',
  ]
    .filter(str => str)
    .join(' ')
}

export function effectToString(effect: RawDB.PirateRumble.Effect): string {
  if (!effect) return ''

  if (!('effect' in effect)) {
    return ''
  }

  switch (effect.effect) {
    case 'buff':
      return `Applies Lv.${effect.level} ${arrayToString(
        effect.attributes,
      )} up buff`
    case 'debuff':
      return `Inflicts Lv.${effect.level} ${arrayToString(
        effect.attributes,
      )} down debuff`
    case 'damage':
      return damageEffectToString(effect as RawDB.PirateRumble.AttackEffectType)
    case 'recharge':
      return rechargeEffectToString(
        effect as RawDB.PirateRumble.RechargeEffectType,
      )
    case 'hinderance':
      return effect.amount
        ? `Removes ${numberToString(effect.amount)}% of ${arrayToString(
            effect.attributes,
          )}`
        : `${effect.chance}% chance to inflict ${
            effect.level ? 'Lv.' + effect.level + ' ' : ''
          }${arrayToString(effect.attributes)}`
    case 'boon':
      let result = effect.chance ? `${effect.chance}% chance to ` : ''
      const attrStr = arrayToString(effect.attributes)
      switch (attrStr) {
        case 'Provoke':
          result += 'Provoke enemies'
          break
        case 'Haste':
          result += `${effect.chance ? 'g' : 'G'}rant Haste`
          break
        case 'Counter':
          result += `${effect.chance ? 'g' : 'G'}rant ${effect.amount}x Counter`
          break
        default:
          result += `${'reduce ' + attrStr}`
          break
      }
      return result
    case 'penalty':
      const tmpStr = arrayToString(effect.attributes)
      if (tmpStr === 'HP' && effect.amount) {
        return `${numberToString(effect.amount)}% health cut`
      } else if (effect.level) {
        return `Inflicts Lv.${numberToString(effect.level)} ${arrayToString(
          effect.attributes,
        )} down penalty`
      } else {
        return `${effect.chance}% chance to ${arrayToString(effect.attributes)}`
      }
    case 'cleanse':
      return `${effect.chance}% chance to cleanse ${arrayToString(
        effect.attributes,
      )} debuffs`
    default:
      throw new Error(`UNKNOWN EFFECT ${JSON.stringify(effect)}`)
  }
}

function rechargeEffectToString(effect: RawDB.PirateRumble.RechargeEffectType) {
  let condition = ''
  switch (effect.type) {
    case 'RCV':
      condition += `Restores ${numberToString(effect.amount)}x RCV of HP`
      break
    case 'percentage':
      condition += `Restores ${numberToString(effect.amount)}% of HP`
      break
    case 'fixed':
      condition += `Restores ${numberToString(effect.amount)} fixed HP`
      break
    case 'Special CT':
      condition += `Reduces ${numberToString(effect.amount)}% of ${effect.type}`
      break
    default:
      throw new Error(`UNKNOWN Effect Type ${JSON.stringify(effect)}`)
  }

  if (effect.interval) {
    condition += ` every ${effect.interval} ${
      effect.interval == 1 ? 'second' : 'seconds'
    } for ${effect.duration} ${effect.duration == 1 ? 'second' : 'seconds'}`
  }

  if (effect.repeat) {
    condition += ` ${numberToString(effect.repeat)} times`
  }

  return condition
}

export function damageEffectToString(
  effect: RawDB.PirateRumble.AttackEffectType,
): string {
  let result = ''

  switch (effect.type) {
    case 'time':
      result = `Deals Lv.${effect.level} Damage Over Time`
      break
    case 'atk':
      result = `Deals ${effect.amount}x ATK in damage`
      break
    case 'fixed':
      result = `Deals ${effect.amount} fixed damage`
      break
    case 'cut':
      result = `${effect.amount}% health cut`
      break
    default:
      return ''
  }
  return effect.defbypass ? `${result} that will ignore DEF` : result
}

export function conditionToString(
  condition: RawDB.PirateRumble.Condition | undefined,
): string {
  if (!condition) return ''

  switch (condition.type) {
    case 'stat':
      return `When ${condition.stat} is ${condition.comparator} ${condition.count}%,`
    case 'time':
      switch (condition.comparator) {
        case 'first':
          return `For the first ${condition.count} seconds,`
        case 'after':
          return `After the first ${condition.count} seconds,`
        case 'remaining':
          return `When there are ${condition.count} seconds or less remaining,`
        default:
          throw new Error(`UNKNOWN TIME CONDITION ${JSON.stringify(condition)}`)
      }
    case 'crew':
    case 'enemies':
      return `When there are ${condition.count} or ${condition.comparator} ${condition.type} remaining,`
    case 'trigger':
      return `The first ${condition.count} times this character lands a ${condition.stat},`
    case 'defeat':
      switch (condition.team) {
        case 'enemies':
          return `When ${condition.count} characters on the enemy team are defeated, `
        case 'crew':
          return `When ${condition.count} characters on your crew are defeated, `
        default:
          return `When ${condition.count} characters are defeated, `
      }
    default:
      throw new Error(`UNKNOWN CONDITION ${JSON.stringify(condition)}`)
  }
}

export function rangeToString(
  range: RawDB.PirateRumble.Range | undefined,
): string {
  if (!range) return ''
  return ` in a ${range.size}, ${range.direction} range`
}

export function targetToString(target: RawDB.PirateRumble.Targeting): string {
  if (!target) return ''

  let targetStr = arrayToString(target.targets)
  if (targetStr === 'crew') targetStr = 'crew member(s)'
  if (targetStr === 'enemies') {
    if (!target.count) {
      targetStr = 'all enemies'
    } else if (target.count === 1) {
      targetStr = 'enemy'
    }
  }
  let retVal = ` to ${target.count ? target.count + ' ' : ''}${targetStr}${
    target.targets.includes('self') ||
    target.targets.includes('crew') ||
    target.targets.includes('enemies')
      ? ''
      : target.count === 1
      ? ' character'
      : ' characters'
  }`
  retVal =
    retVal +
    (target.stat
      ? ' with ' +
        (target.percentage ? 'a ' + target.percentage + '% or ' : 'the ') +
        target.priority +
        ' ' +
        target.stat
      : '')
  return retVal
}
