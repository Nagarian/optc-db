import { LoadOldDb } from './services/old-loader'
import { validate } from './services/old-validator'
import { remapper } from './services/raw-extracter'

const oldDb = LoadOldDb()
validate(oldDb)
remapper(oldDb)