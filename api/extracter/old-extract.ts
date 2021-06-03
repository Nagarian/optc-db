import { downloadGloCharacters, downloadJapCharacters } from './services/image'
import { LoadOldDb } from './services/old-loader'
import { validate as oldValidate } from './services/old-validator'
import { remapper } from './services/raw-extracter'
import { writeToDisk } from './services/raw-fs'
import { validate } from './services/raw-validator'

async function main() {
  const oldDb = LoadOldDb()
  if (!oldValidate(oldDb)) {
    process.exit(-1)
  }

  await downloadJapCharacters(oldDb)
  await downloadGloCharacters(oldDb)

  const rawDb = remapper(oldDb)

  if (!validate(rawDb)) {
    process.exit(-1)
  }

  writeToDisk(rawDb, 'yaml')
}

main()
