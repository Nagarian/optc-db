import { createWriteStream, existsSync } from 'fs'
import { mkdir } from 'fs/promises'
import http from 'https'
import { dirname, join } from 'path'
import { OldDB } from '../old-to-raw/models/old-db'
import { ProgressBar } from '../services/progress-bar'

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
  const promises: Promise<number | undefined>[] = []

  for (const unit of units.filter(u => u.id < 5001)) {
    const japPath = getImagePath(unit.id, thumbnailJap, undefined)

    await mkdir(dirname(japPath), {
      recursive: true,
    })

    const idNormalized = unit.id.toString().padStart(4, '0')

    if (unit.flags.gloOnly) continue

    promises.push(
      downloadImage(
        unit.images.thumbnail ??
          `https://onepiece-treasurecruise.com/wp-content/uploads/f${idNormalized}.png`,
        japPath,
      ).then(success => {
        bar.increment()
        return !success ? unit.id : undefined
      }),
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
          ).then(success => {
            bar.increment()
            return !success ? unit.id : undefined
          }),
        )
      }

      process(dual1, '1')
      process(dual2, '2')
      process(dualCombined1, dualCombined1?.type as AlternativeCharacter)
      process(dualCombined2, dualCombined2?.type as AlternativeCharacter)
    }
  }

  const missingImages = (await Promise.all(promises)).filter(x => !!x) as number[]

  console.timeEnd('Download missing jap characters thumbnail End')
  missingImages.length && console.log(`Missing ${missingImages.length} characters images`, ...missingImages)
}

export async function downloadGloCharacters(units: OldDB.ExtendedUnit[]) {
  console.log('Download missing glo characters thumbnail Start')
  console.time('Download missing glo characters thumbnail End')

  const bar = new ProgressBar(units.length)
  const promises: Promise<number | undefined>[] = []

  for (const unit of units) {
    const gloPath = getImagePath(unit.id, thumbnailGlo, undefined)

    await mkdir(dirname(gloPath), {
      recursive: true,
    })

    const idNormalized = unit.id.toString().padStart(4, '0')

    if (unit.flags.japOnly) continue

    promises.push(
      downloadImage(
        `https://onepiece-treasurecruise.com/wp-content/uploads/sites/2/f${idNormalized}.png`,
        gloPath,
      ).then(success => {
        bar.increment()
        return !success ? unit.id : undefined
      }),
    )
  }

  const missingImages = (await Promise.all(promises)).filter(x => !!x) as number[]

  console.timeEnd('Download missing glo characters thumbnail End')
  missingImages.length && console.log(`Missing ${missingImages.length} characters images`, ...missingImages)
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
