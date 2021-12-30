import { DBdrop, DBunit } from '../loader/db-loader'
import { OldDB } from '../models/old-db'

export function fixupFlags(unit: OldDB.ExtendedUnit): OldDB.ExtendedUnit {
  const condition = (event: number[]) => event.includes(unit.id)

  if (condition(eventLightModules.Story)) {
    unit.flags.story = 1
  }

  if (condition(eventLightModules.Fortnight)) {
    unit.flags.fortnight = 1
  }

  if (condition(eventLightModules.Coliseum)) {
    unit.flags.coliseum = 1
  }

  if (condition(eventLightModules.Arena)) {
    unit.flags.arena = 1
  }

  if (condition(eventLightModules.TM)) {
    unit.flags.tm = 1
  }

  if (condition(eventLightModules.Kizuna)) {
    unit.flags.kizuna = 1
  }

  if (condition(eventLightModules.Rumble)) {
    unit.flags.rumble = 1
  }

  if (condition(eventLightModules.Raid)) {
    unit.flags.raid = 1
  }

  if (condition(eventLightModules.Ambush)) {
    unit.flags.ambush = 1
  }

  return unit
}

const eventLightModules = {
  Fortnight: DBdrop.Fortnight.flatMap(
    fn => fn['All Difficulties'] ?? fn.Global ?? [],
  ).filter(id => id > 0),
  TM: DBdrop['Treasure Map'].map(tm => tm.thumb),
  Ambush: dropMapper('Ambush'),
  Arena: dropMapper('Arena'),
  Kizuna: dropMapper(
    'Kizuna Clash',
    'Round 1',
    'Round 2',
    'Round 3',
    'Round 4',
    'Round 5',
    'Round 6',
  ),
  Rumble: dropMapper('Pirate Rumble'),
  Raid: dropMapper('Raid', 'Master', 'Expert', 'Ultimate'),
  Coliseum: dropMapper('Coliseum', 'Chaos', 'Underground', 'Exhibition'),
  Story: dropMapper(
    'Story Island',
    'Completion Units',
    ...[...Array(100).keys()].map(i => i.toString().padStart(2, '0')),
  ),
}

function dropMapper(dropKey: string, ...subKey: string[]): number[] {
  const init: number[] = []
  return DBdrop[dropKey]
    .reduce(
      (all, quest) => [
        ...all,
        quest.thumb,
        ...(quest['All Difficulties'] ?? []),
        ...subKey.reduce(
          (allsub, sub) => [...allsub, ...(quest[sub] ?? [])],
          init,
        ),
      ],
      init,
    )
    .filter(Boolean)
    .filter(
      (/** @type number */ id) =>
        id > 0 && // remove books
        !!DBunit[id - 1] && // remove skull and other tricks
        !['Evolver', 'Booster'].includes(DBunit[id - 1].class.toString()), // remove evolver and booster
    )
    .filter((value, index, self) => self.indexOf(value) === index) // distinct fn
}
