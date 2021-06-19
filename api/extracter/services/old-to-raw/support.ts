import { OldDB } from '../../models/old-db'
import { RawDB } from '../../models/raw-db'
import { extractNotes } from './notes'

const supportReductionRegex =
  /Reduces damage received from \[?(?<type>STR|DEX|QCK|PSY|INT)\]? (characters|enemies) by (?<value>\d+|\?)%[,.]?/i

const supportStatRegex = [
  /Adds (?<value>\d+|\?)% of this character's base (?<value_type>ATK|HP|RCV) to the supported character's base (ATK|HP|RCV)[,.]?/i,
  /Adds (?<value>\d+|\?)% of this character's base (?<value_type>ATK|HP|RCV) and (?<value_type_2>ATK|HP|RCV) to the supported character's base (ATK|HP|RCV) and (ATK|HP|RCV)[,.]?/i,
  /Adds (?<value>\d+|\?)% of this character's base (?<value_type>ATK), (?<value_type_2>HP) and (?<value_type_3>RCV) to the supported character's base ATK, HP and RCV[,.]?/i,
]

export function extractSupport(
  unit: OldDB.ExtendedUnit,
): RawDB.Support | undefined {
  if (!unit.detail.support?.length) return undefined
  const desc = unit.detail.support[0].description
  const lastDesc = desc[desc.length - 1]
  let reductionType: RawDB.ColorType | undefined = undefined

  const statRegex = supportStatRegex.find(r => r.test(lastDesc))

  let statsTypes: RawDB.StatsType[] = []

  if (statRegex) {
    const result = statRegex.exec(lastDesc)
    statsTypes = [
      result?.groups?.value_type,
      result?.groups?.value_type_2,
      result?.groups?.value_type_3,
    ].filter(u => !!u).map(u => u!.toUpperCase()) as RawDB.StatsType[]
  }

  if (supportReductionRegex.test(lastDesc)) {
    reductionType = supportReductionRegex.exec(lastDesc)?.groups?.type as
      | RawDB.ColorType
      | undefined
  }

  if (!statsTypes.length) {
    return <RawDB.DescriptiveSupport>{
      type: 'descriptive',
      criteria: unit.detail.support[0].Characters,
      levels: unit.detail.support[0].description,
      notes: extractNotes(unit.detail.supportNotes),
    }
  }

  return <RawDB.StatsSupport>{
    type: 'stats',
    defenseType: reductionType,
    statsTypes: statsTypes,
    criteria: unit.detail.support[0].Characters,
    levels: desc.map(d => {
      const reductionExtraction = supportReductionRegex.exec(d)
      const reduction = parseInt(reductionExtraction?.groups?.value ?? '')

      const valueExtraction = statRegex?.exec(d)
      const value = parseInt(valueExtraction?.groups?.value ?? '')

      const desc = d
        .replace(valueExtraction?.[0] ?? '', '')
        .replace(reductionExtraction?.[0] ?? '', '')
        .trim()

      return {
        description: desc || undefined,
        value: value === 0 ? value : value || undefined,
        reduction: !reduction ? undefined : reduction,
      }
    }),
    notes: extractNotes(unit.detail.supportNotes),
  }
}
