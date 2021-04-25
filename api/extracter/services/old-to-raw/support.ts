import { OldDB } from '../../models/old-db'
import { RawDB } from '../../models/raw-db'
import { extractNotes } from './notes'

const AtkRegex = /Adds.+%.+ATK/i
const HpRegex = /Adds.+%.+HP/i
const RcvRegex = /Adds.+%.+RCV/i
const supportValueRegex = /Adds (?<value>\d+|\?)%.+(ATK|HP|RCV)/i
const supportReductionRegex = /Reduces damage received from \[?(?<type>STR|DEX|QCK|PSY|INT)\]?.+by (?<value>\d+|\?)%/i

export function extractSupport(
  unit: OldDB.ExtendedUnit,
): RawDB.Support | undefined {
  if (!unit.detail.support?.length) return undefined
  const desc = unit.detail.support[0].description
  const lastDesc = desc[desc.length - 1]
  let reductionType: RawDB.Type | undefined = undefined

  const supportType: RawDB.SupportType[] = []
  if (AtkRegex.test(lastDesc)) {
    supportType.push('atk')
  }
  if (HpRegex.test(lastDesc)) {
    supportType.push('hp')
  }
  if (RcvRegex.test(lastDesc)) {
    supportType.push('rcv')
  }
  if (supportReductionRegex.test(lastDesc)) {
    reductionType = supportReductionRegex.exec(lastDesc)?.groups?.type as
      | RawDB.Type
      | undefined
    supportType.push('def')
  }
  if (!supportType.length) {
    supportType.push('other')
  }

  return {
    criteria: unit.detail.support[0].Characters,
    type: supportType,
    levels: desc.map(d => {
      const reduction =
        parseInt(supportReductionRegex.exec(d)?.groups?.value ?? '') ??
        undefined

      return {
        description: d,
        value:
          parseInt(supportValueRegex.exec(d)?.groups?.value ?? '') ?? undefined,
        reduction: !reduction
          ? undefined
          : {
              type: reductionType!,
              value: reduction,
            },
      }
    }),
    notes: extractNotes(unit.detail.supportNotes),
  }
}
