import { LoadOldDb } from './services/old-loader'
import { validate as oldValidate } from './services/old-validator'
import { remapper } from './services/raw-extracter'
import { validate } from './services/raw-validator'

const oldDb = LoadOldDb()
oldValidate(oldDb)
const rawDb = remapper(oldDb)
validate(rawDb)
