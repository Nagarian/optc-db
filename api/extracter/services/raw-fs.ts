import { writeFile, mkdir, readdir, readFile } from 'fs/promises'
import { basename, join, extname } from 'path'
import { RawDB } from '../models/raw-db'
import YAML from 'yaml'

const basePath = '../raw'

export async function writeToDisk(db: RawDB.DBCharacter[]): Promise<void> {
  console.log('Writing RawDB to disk - starting')
  const timerLabel = 'Writing RawDB to disk done'
  console.time(timerLabel)

  for (const [id, character] of db) {
    const filePath = join(
      basePath,
      `${Math.trunc(id / 1000)}000`,
      `${Math.trunc((id % 1000) / 100)}00`,
    )

    await mkdir(filePath, {
      recursive: true,
    })

    const filename = id.toString().padStart(4, '0').concat('.json')

    await writeFile(
      join(filePath, filename),
      JSON.stringify(character, null, 2),
    )

    const type = character.type === 'DUAL'
      ? '.dual'
      : character.type === 'VS'
      ? '.versus'
      : '.single'

    const yamlFile = id.toString().padStart(4, '0').concat(type,'.yml')

    await writeFile(
      join(filePath, yamlFile),
      YAML.stringify(character, { simpleKeys: true }),
    )
  }

  console.timeEnd(timerLabel)
}

export async function loadFromDisk(): Promise<RawDB.DBCharacter[]> {
  console.log('Loading RawDB from disk - starting')
  const timerLabel = 'Loading RawDB from disk done'
  console.time(timerLabel)

  const result: RawDB.DBCharacter[] = []

  for await (const file of walk(basePath)) {
    const character = JSON.parse(await readFile(file, 'utf-8'))
    const id = parseInt(basename(file, extname(file)), 10)
    result.push([id, character])
  }

  console.timeEnd(timerLabel)

  return result
}

async function* walk(dir: string): AsyncGenerator<string> {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const res = join(dir, entry.name)
    if (entry.isDirectory()) {
      yield* walk(res)
    } else {
      yield res
    }
  }
}
