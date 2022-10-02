import { OldDB } from '../models/old-db'
import { RawDB } from '../../raw-db/models/raw-db'
import {
  extractRumbleAbility,
  extractRumbleResilience,
  extractRumbleSpecial,
} from './rumble'
import { extractCaptainLevelLimitBreak } from './captain'
import { extractSpecialDescription } from './special'
import { extractSailorDescription } from './sailor'

export function extractLevelLimitBreak(
  unit: OldDB.ExtendedUnit,
): RawDB.LevelLimitBreak[] | undefined {
  if (!unit.detail.lLimit?.length) return undefined

  return unit.detail.lLimit?.map(level =>
    extractLevelLimitBreakLevel(level, unit.rumble),
  )
}

export function extractLevelLimitBreakLevel(
  llb: OldDB.UnitLevelLimitBreak,
  rumble: OldDB.PirateFest.Unit | undefined,
): RawDB.LevelLimitBreak {
  const result: RawDB.LevelLimitBreak = {}

  if (!llb) return result

  if (llb.rAbility && rumble?.llbability) {
    result.rumble = {
      ...(result.rumble || {}),
      ability: extractRumbleAbility(rumble.llbability),
    }
  }

  if (llb.rSpecial && rumble?.llbspecial) {
    result.rumble = {
      ...(result.rumble || {}),
      special: extractRumbleSpecial(rumble.llbspecial),
    }
  }

  if (llb.rResilience && rumble?.llbresilience) {
    result.rumble = {
      ...(result.rumble || {}),
      resilience: extractRumbleResilience(rumble.llbresilience),
    }
  }

  if (llb.captain) {
    result.captain = extractCaptainLevelLimitBreak(llb.captain)
  }

  if (llb.special) {
    result.special = extractSpecialDescription(llb.special)
  }

  if (llb.sailor) {
    result.sailor = {
      sailor1: extractSailorDescription(llb.sailor, 'level1'),
      sailor2: extractSailorDescription(llb.sailor, 'level2'),
    }
  }

  return result
}
