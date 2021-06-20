import { OldDB } from '../models/old-db'
import {
  DBalias,
  DBcooldown,
  DBdetail,
  DBevolution,
  DBfamily,
  DBflag,
  DBgamewith,
  DBunit,
  DButils,
} from './db-loader'
import { getEvolutionMap } from './evolution'
import { fixupDetail } from './fixup/detail'
import { fixupDualVersusMapping, isGhostUnit } from './fixup/dual-versus'
import {
  addGloOnly,
  fixupGloOnlyEvolution,
  fixupGloOnlyFlags,
  fixupGloOnlyImages,
  fixupSuperEvolutionMap,
} from './fixup/global-only'
import { fixupImages } from './fixup/image'
import { fixupRumbleCost, fixupVersusRumbleData, getRumble } from './fixup/rumble'
import { fixupSpecificIssue } from './fixup/specific-issue'
import { fixupVersusUnit } from './fixup/versus'
import { checkGloJapMapping, globalOnlyWrongId } from './global-only'

const evolutionMap = getEvolutionMap()

export function LoadOldDb(): OldDB.ExtendedUnit[] {
  let db = DBunit.filter(unit => unit.name)
    .map(GetExtendedUnit)
    .map(fixupDetail)
    .map(fixupImages)
    .map(fixupVersusUnit)
    .map(fixupDualVersusMapping)
    .filter(u => !isGhostUnit(u))
    .map(fixupVersusRumbleData)
    .map(fixupRumbleCost)
    .map(fixupSpecificIssue)

  checkGloJapMapping(db)

  db = db
    .concat(addGloOnly(db))
    .map(fixupSuperEvolutionMap)
    .map(fixupGloOnlyImages)
    .map(fixupGloOnlyEvolution)
    .map(fixupGloOnlyFlags)

  db.sort((u1, u2) => u1.id - u2.id)
  return db
}

function GetExtendedUnit(unit: OldDB.BaseUnit): OldDB.ExtendedUnit {
  const dbId = unit.number + 1
  const gameId = globalOnlyWrongId[dbId] ?? dbId
  const flags: OldDB.UnitFlags = DBflag[dbId] ?? {}

  const extended: OldDB.ExtendedUnit = {
    ...unit,
    id: gameId,
    dbId,
    images: {
      thumbnail: DButils.getThumbnailUrl(dbId),
      full: DButils.getBigThumbnailUrl(dbId),
    },
    evolution: DBevolution[dbId],
    cooldown: DBcooldown[unit.number] ?? undefined,
    detail: DBdetail[dbId] ?? {},
    flags,
    family: DBfamily[unit.number] ?? undefined,
    pirateFest: unit.pirateFest?.class ? unit.pirateFest : undefined,
    evolutionMap: evolutionMap[dbId] ?? [dbId],
    aliases: DBalias[dbId],
    gamewith: DBgamewith[unit.number] ?? undefined,
    rumble: getRumble(dbId),
  }

  return extended
}
