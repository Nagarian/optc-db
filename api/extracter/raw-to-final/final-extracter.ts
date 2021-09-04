import { RawDB } from '../raw-db/models/raw-db'
import { FinalDB } from './models/final-db'

export function remapper(db: RawDB.DBCharacter[]): FinalDB.Character[] {
  return db.map(([id, unit]) => ({
    id,
    ...unit,
  }))
}
