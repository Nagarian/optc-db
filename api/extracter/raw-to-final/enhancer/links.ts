import { RawDB } from '../../raw-db/models/raw-db'
import { FinalDB } from '../models/final-db'

export function enhanceLinks(
  character: RawDB.Character,
): FinalDB.AffiliatedLinks {
  const links = character.links
  const flags = character.flags

  const gamewith = links?.gamewithId
    ? `http://xn--pck6bvfc.gamewith.jp/article/show/${id}`
    : undefined

  const officialJapan = links?.officialJapan
    ? `http://onepiece-treasurecruise.com${links.officialJapan}`
    : `http://onepiece-treasurecruise.com/c-${id}`

  const officialGlobal = `http://onepiece-treasurecruise.com/en/c-${id}`

  return {
    gamewith,
    officialGlobal: flags.includes('japex') ? undefined : officialGlobal,
    officialJapan: flags.includes('gloex') ? undefined : officialJapan,
  }
}
