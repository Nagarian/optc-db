import { writeFile, mkdir, readdir, readFile } from 'fs/promises'
import { basename, join, extname } from 'path'
import YAML from 'yaml'
import { RawDB } from '../raw-db/models/raw-db'
import { ProgressBar } from '../services/progress-bar'

const basePath = '../raw/characters'

export type WriteType = 'all' | 'yaml' | 'json'

export async function writeToDisk(
  db: RawDB.DBCharacter[],
  mode: WriteType,
): Promise<void> {
  console.log('Writing RawDB to disk - starting')
  const timerLabel = 'Writing RawDB to disk done'
  console.time(timerLabel)

  const bar = new ProgressBar(db.length)

  for (const [id, character] of db) {
    const filePath = join(
      basePath,
      `${Math.trunc(id / 1000)}`,
      `${Math.trunc((id % 1000) / 100)}00`,
    )

    await mkdir(filePath, {
      recursive: true,
    })

    if (mode === 'all' || mode === 'json') {
      const filename = id.toString().padStart(4, '0').concat('.json')

      await writeFile(
        join(filePath, filename),
        JSON.stringify(character, null, 2),
      )
    }

    if (mode === 'all' || mode === 'yaml') {
      const yamlFile = id.toString().padStart(4, '0').concat('.yml')

      await writeFile(
        join(filePath, yamlFile),
        YAML.stringify({ ...character }, { simpleKeys: true }),
      )
    }

    bar.increment()
  }

  console.timeEnd(timerLabel)
}

export async function loadFromDisk(
  mode: WriteType,
): Promise<RawDB.DBCharacter[]> {
  console.log('Loading RawDB from disk - starting')
  const timerLabel = 'Loading RawDB from disk done'
  console.time(timerLabel)

  const result: RawDB.DBCharacter[] = []

  for await (const file of walk(basePath)) {
    const fileStr = await readFile(file, 'utf-8')
    const character =
      mode === 'json' || mode === 'all'
        ? JSON.parse(fileStr)
        : YAML.parse(fileStr)
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
