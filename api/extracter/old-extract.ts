import { LoadOldDb } from './services/old-loader'
import { validate as oldValidate } from './services/old-validator'
import { remapper } from './services/raw-extracter'
import { writeToDisk } from './services/raw-fs'
import { validate } from './services/raw-validator'

const oldDb = LoadOldDb()
if (oldValidate(oldDb)) {
  process.exit(-1)
}

const rawDb = remapper(oldDb)
if (!validate(rawDb)) {
  process.exit(-1)
}

writeToDisk(rawDb)
