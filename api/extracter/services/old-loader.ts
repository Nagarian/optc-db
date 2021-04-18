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
} from './db-loader'
import { getEvolutionMap } from './evolution'
import { fixupDetail } from './fixup/detail'
import {
  fixupDualVersusMapping,
  removeDualVersusOldMapping,
} from './fixup/dual-versus'
import {
  fixupGloOnlyImages,
  fixupGloOnlyEvolution,
  fixupGloOnlyFlags,
  addGloOnly,
  fixupSuperEvolutionMap,
} from './fixup/global-only'
import { fixupSpecificIssue } from './fixup/specific-issue'
import { fixupVersusUnit } from './fixup/versus'
import { globalOnlyWrongId } from './global-only'
import { getUnitFullPicture, getUnitThumbnail } from './image'

const evolutionMap = getEvolutionMap()

export function LoadOldDb(): OldDB.ExtendedUnit[] {
  let db = DBunit.filter(unit => unit.name)
    .map(GetExtendedUnit)
    .map(fixupDetail)
    .map(fixupDualVersusMapping)
    .filter(removeDualVersusOldMapping)
    .map(fixupVersusUnit)
    .map(fixupSpecificIssue)

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
      thumbnail: getUnitThumbnail(dbId),
      full: getUnitFullPicture(dbId),
    },
    evolution: DBevolution[dbId],
    cooldown: DBcooldown[unit.number],
    detail: DBdetail[dbId] ?? {},
    flags,
    family: DBfamily[unit.number] ?? undefined,
    pirateFest: unit.pirateFest?.class ? unit.pirateFest : undefined,
    evolutionMap: evolutionMap[dbId] ?? [dbId],
    aliases: DBalias[dbId],
    gamewith: DBgamewith[unit.number] ?? undefined,
  }

  return extended
}
