import { downloadGloCharacters, downloadJapCharacters } from './raw-db/image'
import { LoadOldDb } from './old-to-raw/old-loader'
import { validate as oldValidate } from './old-to-raw/old-validator'
import { remapper } from './old-to-raw/raw-extracter'
import { writeToDisk } from './raw-db/raw-fs'
import { validate } from './raw-db/raw-validator'

async function main() {
  const oldDb = LoadOldDb()

  if (!oldValidate(oldDb)) {
    process.exit(-1)
  }

  // await downloadJapCharacters(oldDb)
  // await downloadGloCharacters(oldDb)

  const rawDb = remapper(oldDb, true)

  if (!validate(rawDb)) {
    process.exit(-1)
  }

  writeToDisk(rawDb, 'yaml')
}

main()
