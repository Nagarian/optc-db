import { OldDB } from '../models/old-db'

export function fixupSupport(unit: OldDB.ExtendedUnit): OldDB.ExtendedUnit {
  // @ts-ignore
  delete unit.support

  return unit
}
