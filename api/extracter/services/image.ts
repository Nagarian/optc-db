import { createWriteStream, existsSync } from 'fs'
import { mkdir } from 'fs/promises'
import http from 'https'
import { join, dirname } from 'path'
import { OldDB } from '../models/old-db'
import { ProgressBar } from './progress-bar'

type AlternativeCharacter = '1' | '2' | 'STR' | 'DEX' | 'QCK' | 'PSY' | 'INT'

const thumbnailJap = '../images/thumbnail/jap'
const thumbnailGlo = '../images/thumbnail/glo'

export function getImagePath(
  id: number,
  subPath: string,
  alternativeCharacter?: AlternativeCharacter,
): string {
  const path = join(
    subPath,
    `${Math.trunc(id / 1000)}`,
    `${Math.trunc((id % 1000) / 100)}00`,
  )

  const baseFileName = id.toString().padStart(4, '0')

  const fileName = alternativeCharacter
    ? `${baseFileName}-${alternativeCharacter}.png`
    : `${baseFileName}.png`

  return join(path, fileName)
}

export async function downloadJapCharacters(units: OldDB.ExtendedUnit[]) {
  console.log('Download missing jap characters thumbnail Start')
  console.time('Download missing jap characters thumbnail End')

  const bar = new ProgressBar(units.length)
  const promises: Promise<void>[] = []

  for (const unit of units.filter(u => u.id < 5001)) {
    const japPath = getImagePath(unit.id, thumbnailJap, undefined)

    await mkdir(dirname(japPath), {
      recursive: true,
    })

    promises.push(
      downloadImage(unit.images.thumbnail, japPath).then(() => bar.increment()),
    )

    if (unit.dualCharacters?.length) {
      const [dual1, dual2, dualCombined1, dualCombined2] = unit.dualCharacters

      const process = (
        dualUnit: OldDB.ExtendedUnit,
        alternative: AlternativeCharacter,
      ) => {
        if (!dualUnit) return

        bar.incrementTotal()

        promises.push(
          downloadImage(
            dualUnit.images.thumbnail,
            getImagePath(unit.id, thumbnailJap, alternative),
          ).then(() => bar.increment()),
        )
      }

      process(dual1, '1')
      process(dual2, '2')
      process(dualCombined1, dualCombined1?.type as AlternativeCharacter)
      process(dualCombined2, dualCombined2?.type as AlternativeCharacter)
    }
  }

  await Promise.all(promises)

  console.timeEnd('Download missing jap characters thumbnail End')
}

export async function downloadGloCharacters(units: OldDB.ExtendedUnit[]) {
  console.log('Download missing glo characters thumbnail Start')
  console.time('Download missing glo characters thumbnail End')

  const bar = new ProgressBar(units.length)
  const promises: Promise<void>[] = []

  for (const unit of units) {
    const gloPath = getImagePath(unit.id, thumbnailGlo, undefined)

    await mkdir(dirname(gloPath), {
      recursive: true,
    })

    const idNormalized = unit.id.toString().padStart(4, '0')

    promises.push(
      downloadImage(
        `https://onepiece-treasurecruise.com/wp-content/uploads/sites/2/f${idNormalized}.png`,
        gloPath,
      ).then(() => bar.increment()),
    )
  }

  await Promise.all(promises)

  console.timeEnd('Download missing glo characters thumbnail End')
}

function downloadImage(
  url: string | undefined,
  path: string,
): Promise<boolean> {
  if (!url) return Promise.resolve(false)

  if (existsSync(path)) return Promise.resolve(true)

  return new Promise(resolve => {
    http
      .get(url, res => {
        if (res.statusCode !== 200) {
          resolve(false)
        } else {
          res.pipe(createWriteStream(path)).on('close', () => resolve(true))
        }
      })
      .on('error', err => {
        resolve(false)
      })
  })
}
