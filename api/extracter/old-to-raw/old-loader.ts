import { fixupDetail } from './fixup/detail'
import { fixupDualVersusMapping, isGhostUnit } from './fixup/dual-versus'
import { fixupFlags } from './fixup/flags'
import {
  addGloOnly,
  fixupGloOnlyEvolution,
  fixupGloOnlyFlags,
  fixupGloOnlyImages,
  fixupSuperEvolutionMap,
} from './fixup/global-only'
import { fixupImages } from './fixup/image'
import {
  fixupRumbleCost,
  fixupVersusRumbleData,
  getRumble,
} from './fixup/rumble'
import { fixupSpecificIssue } from './fixup/specific-issue'
import { fixupSupport } from './fixup/support'
import { fixupVersusUnit } from './fixup/versus'
import {
  DBalias,
  DBcooldown,
  DBdetail,
  DBevolution,
  DBflag,
  DBgamewith,
  DBunit,
  DButils,
} from './loader/db-loader'
import { getEvolutionMap } from './loader/evolution'
import { checkGloJapMapping, globalOnlyWrongId } from './loader/global-only'
import { OldDB } from './models/old-db'

const evolutionMap = getEvolutionMap()

export function LoadOldDb(): OldDB.ExtendedUnit[] {
  let db = DBunit.filter(unit => unit.name)
    .map(GetExtendedUnit)
    .map(fixupSupport)
    .map(fixupDetail)
    .map(fixupImages)
    .map(fixupFlags)
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
    pirateFest: unit.pirateFest?.class ? unit.pirateFest : undefined,
    pirateFest2: undefined,
    evolutionMap: evolutionMap[dbId] ?? [dbId],
    aliases: DBalias[dbId],
    gamewith: DBgamewith[unit.number] ?? undefined,
    rumble: getRumble(dbId),
  }

  return extended
}
