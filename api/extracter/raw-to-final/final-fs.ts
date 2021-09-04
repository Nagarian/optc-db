import { writeFile } from 'fs/promises'
import { join } from 'path'
import { FinalDB } from './models/final-db'

const basePath = '../db/'

export async function writeToDisk(db: FinalDB.Character[]): Promise<void> {
  console.log('Writing Final DB to disk - starting')
  const timerLabel = 'Writing Final DB to disk done'
  console.time(timerLabel)

  await writeFile(
    join(basePath, 'characters.json'),
    JSON.stringify(db),
  )

  console.timeEnd(timerLabel)
}
