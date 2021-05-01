import { OldDB } from '../../models/old-db'

export function fixupImages(unit: OldDB.ExtendedUnit): OldDB.ExtendedUnit {
  const thumbnail = cleanImageUrl(unit.id, unit.images.thumbnail)
  const full = cleanImageUrl(unit.id, unit.images.full)

  return {
    ...unit,
    images: {
      thumbnail,
      full,
    },
  }
}

function cleanImageUrl(id: number, url?: string): string | undefined {
  if (!url) return undefined

  if (url.includes('noimage')) return undefined

  if (url.includes('blank_')) return undefined

  const idNormalized = id.toString().padStart(4, '0')
  if (
    url ===
    `https://onepiece-treasurecruise.com/wp-content/uploads/f${idNormalized}.png`
  )
    return undefined

  return url
    .replace('../res', 'https://optc-db.github.io/res/')
    .replace('http:', 'https:')
}
