import { loadFromDisk } from './raw-db/raw-fs'
import { validate } from './raw-db/raw-validator'
import { remapper } from './raw-to-final/final-extracter'
import { writeToDisk } from './raw-to-final/final-fs'

async function main() {
  const rawDb = await loadFromDisk('yaml')

  if (!validate(rawDb)) {
    process.exit(-1)
  }

  writeToDisk(remapper(rawDb))
}

main()
