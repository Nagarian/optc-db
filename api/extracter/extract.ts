import { LoadOldDb } from './services/old-loader'
import { validate } from './services/old-validator'

const oldDb = LoadOldDb()
validate(oldDb)
