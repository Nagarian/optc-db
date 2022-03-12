import { RawDB } from '../../raw-db/models/raw-db'
import { OldDB } from '../models/old-db'
import { extractDescription } from './description'
import { extractNotes } from './notes'

const isSimpleSpecial = (
  special: OldDB.UnitSpecial,
): special is OldDB.SimpleStageSpecial => typeof special === 'string'

const isMultiStageSpecial = (
  special: OldDB.UnitSpecial,
): special is OldDB.MultiStageSpecial => Array.isArray(special)

const isDualCharacterSpecial = (
  special: OldDB.UnitSpecial,
): special is OldDB.DualCharacterSpecial =>
  !!(special as OldDB.DualCharacterSpecial).character1

export const isGloJapSpecial = (
  special?: OldDB.UnitSpecial,
): special is OldDB.GloJapSpecial => !!(special as OldDB.GloJapSpecial)?.global

export function extractSpecial(
  unit: OldDB.ExtendedUnit,
  dualCharacterChosen: 1 | 2 | undefined = undefined,
): RawDB.Special | undefined {
  if (!unit.detail.special) return undefined
  // if (!unit.cooldown || unit.cooldown.length !== 2)
  //   throw new Error(`missing cooldown for unit ${unit.dbId}`)

  const special = unit.detail.special
  const cooldown =
    unit.cooldown?.length === 2
      ? [unit.cooldown[0], unit.cooldown[0] - unit.cooldown[1] + 1]
      : [undefined, undefined]

  if (isSimpleSpecial(special)) {
    return {
      name: unit.detail.specialName || '',
      description: extractDescription(special),
      cooldown: cooldown[0],
      maxLevel: cooldown[1],
      notes: extractNotes(unit.detail.specialNotes),
    }
  }

  if (isGloJapSpecial(special)) {
    console.warn(`${unit.id} is an unexpected glo-jep diff special unit`)
    return {
      name: unit.detail.specialName || '',
      description: `- global: ${special.global}\n\n- japan:${special.japan}`,
      cooldown: cooldown[0],
      maxLevel: cooldown[1],
      notes: extractNotes(unit.detail.specialNotes),
    }
  }

  if (isDualCharacterSpecial(special)) {
    const description =
      dualCharacterChosen === 1
        ? special.character1
        : dualCharacterChosen === 2
        ? special.character2
        : undefined

    return {
      name: unit.detail.specialName || '',
      description: extractDescription(description),
      cooldown: cooldown[0],
      maxLevel: cooldown[1],
      notes: extractNotes(unit.detail.specialNotes),
    }
  }

  if (isMultiStageSpecial(special)) {
    const spe = special[special.length - 1]
    return {
      name: unit.detail.specialName || '',
      description: extractDescription(spe.description),
      cooldown: spe.cooldown[0],
      maxLevel: spe.cooldown[0] - spe.cooldown[1] + 1,
      stages: special
        .slice(0, special.length - 1)
        .map(({ description, cooldown: [initial] }) => ({
          description,
          cooldown: initial,
        })),
      notes: extractNotes(unit.detail.specialNotes),
    }
  }

  throw new Error(`unit ${unit.dbId} has an invalid special`)
}