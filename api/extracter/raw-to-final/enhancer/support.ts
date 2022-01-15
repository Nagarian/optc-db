import { isDescriptiveSupport } from '../../raw-db/helper'
import { RawDB } from '../../raw-db/models/raw-db'
import { arrayToString } from '../helper'
import { FinalDB } from '../models/final-db'

export function enhanceSupport(
  support?: RawDB.Support,
): FinalDB.Support | undefined {
  if (!support) return undefined

  if (isDescriptiveSupport(support)) {
    return {
      ...support,
      //@ts-ignore
      levels: support.levels.map(l => ({ description: l })),
    }
  }

  const shieldDesc = (v?: number) =>
    !!v && !!support.defenseType
      ? `Reduces damage received from [${support.defenseType}] characters by ${v}%.`
      : undefined

  const statsStr = !!support.statsTypes.length
    ? arrayToString(support.statsTypes)
    : undefined

  const statsDesc = (v?: number) =>
    !!v && !!statsStr
      ? `Adds ${v}% of this character's base ${statsStr} to the supported character's base ${statsStr}.`
      : undefined

  return {
    ...support,
    //@ts-ignore
    levels: support.levels.map(s => ({
      ...s,
      description: [shieldDesc(s.reduction), statsDesc(s.value), s.description]
        .filter(Boolean)
        .join(' '),
    })),
  }
}
