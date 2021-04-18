import { DButils } from './db-loader'

export function getUnitThumbnail(unitId: number) {
  try {
    return DButils.getThumbnailUrl(unitId)
      ?.replace('../res', 'https://optc-db.github.io/res/')
      .replace('http:', 'https:')
  } catch (error) {
    return undefined
  }
}

export function getUnitFullPicture(unitId: number) {
  try {
    return DButils.getBigThumbnailUrl(unitId)
      ?.replace('../res', 'https://optc-db.github.io/res/')
      .replace('http:', 'https:')
  } catch (error) {
    return undefined
  }
}
