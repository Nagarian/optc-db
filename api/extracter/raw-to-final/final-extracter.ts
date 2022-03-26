import { RawDB } from '../raw-db/models/raw-db'
import { enhanceCaptain } from './enhancer/captain'
import { computeDBEvolutions } from './enhancer/evolution'
import { computeDBFamily } from './enhancer/family'
import { enhanceLimitBreak } from './enhancer/limit-break'
import { enhanceLinks } from './enhancer/links'
import { enhanceSingleRumble, enhanceVersusRumble } from './enhancer/rumble'
import { enhanceSailor } from './enhancer/sailor'
import { enhanceSpecial } from './enhancer/special'
import { enhanceSupport } from './enhancer/support'
import { FinalDB } from './models/final-db'

export function remapper(db: RawDB.DBCharacter[]): FinalDB.Character[] {
  const evolutions = computeDBEvolutions(db)
  const family = computeDBFamily(db)

  // @ts-ignore
  return db.map(c => remap(c)).filter(c => !!c)

  function remap([id, character]: RawDB.DBCharacter):
    | FinalDB.Character
    | undefined {
    try {
      const baseCharacter = remapBaseCharacter(id, character)

      if (character.type === 'DUAL') {
        baseCharacter.characters = {
          character1: remapDualUnitNode(id, character, 1),
          character2: remapDualUnitNode(id, character, 2),
          swap: character.characters.swap,
          criteria: undefined,
        }
      } else if (character.type === 'VS') {
        baseCharacter.characters = {
          character1: remapDualUnitNode(id, character, 1),
          character2: remapDualUnitNode(id, character, 2),
          swap: undefined,
          criteria: character.characters.criteria,
        }
      }

      return baseCharacter
    } catch (error) {
      console.error(`Character ${id} has raised some error\n`, error)
      return undefined
    }
  }

  function remapBaseCharacter(
    id: number,
    character: RawDB.Character,
  ): FinalDB.Character {
    return {
      id,
      name: character.name,
      frenchName: character.frenchName,
      japanName: character.japanName,
      type: character.type,
      class: (character as RawDB.SingleCharacter).class ?? [],

      aliases: character.aliases,
      captain: enhanceCaptain(
        (character as RawDB.SingleCharacter).captain,
        character.limitBreak,
      ),
      cost: character.cost,
      evolution: evolutions[id],
      family: family[id],
      flags: character.flags,
      limitBreak: enhanceLimitBreak(character.limitBreak),
      links: enhanceLinks(character),
      rarity: character.rarity,
      maxLevel: character.maxLevel,
      maxExp: character.maxExp,
      notes: character.notes,
      oldDbId: character.oldDbId,
      rumble: enhanceSingleRumble(
        character as RawDB.SingleCharacter,
        (evolutions[id]?.map
          .map(id => db.find(([i]) => i == id)?.[1])
          .filter(u => u) as any) ?? [],
      ),
      sailor: enhanceSailor(
        (character as RawDB.SingleCharacter).sailor,
        character.limitBreak,
      ),
      slots: character.slots,
      special: enhanceSpecial(
        (character as RawDB.SingleCharacter).special,
        character.limitBreak,
      ),
      stats: character.stats,
      superSpecial: (character as RawDB.SingleCharacter).superSpecial,
      support: enhanceSupport((character as RawDB.SingleCharacter).support),
    }
  }

  function remapDualUnitNode(
    id: number,
    rawCharacter: RawDB.DualCharacter | RawDB.VersusCharacter,
    dualNode: 1 | 2
  ): FinalDB.MultiCharacterNode {
    const character = dualNode === 1
      ? rawCharacter.characters.character1
      : rawCharacter.characters.character2
    return {
      name: character.name,
      class: character.class,
      stats: character.stats,
      type: character.type,
      captain: enhanceCaptain(character.captain, rawCharacter.limitBreak),
      frenchName: character.frenchName,
      japanName: character.japanName,
      rumble: enhanceVersusRumble(
        rawCharacter as RawDB.VersusCharacter,
        (evolutions[id]?.map
          .map(id => db.find(([i]) => i == id)?.[1])
          .filter(u => u) as any) ?? [],
        dualNode
      ),
      sailor: character.sailor,
      special: enhanceSpecial(character.special, rawCharacter.limitBreak),
      versus: (character as RawDB.VersusUnitDetail).versus,
    }
  }
}
