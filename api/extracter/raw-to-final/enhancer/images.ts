import { getImagePath } from '../../raw-db/image'
import { RawDB } from '../../raw-db/models/raw-db'
import { FinalDB } from '../models/final-db'

const thumbnailserver = '/api/images/thumbnail'

export function enhanceImages(
  id: number,
  character: RawDB.Character,
  evolution: FinalDB.Evolution,
): FinalDB.LocalizedImage {
  const idNormalized = id.toString().padStart(4, '0')
  const isMulti =
    character.type == 'DUAL' || character.type == 'VS' ? undefined : true
  const isNotGloex = character.flags.includes('gloex') ? undefined : true
  const isNotJapex = character.flags.includes('japex') ? undefined : true
  const dualchars = (character as RawDB.DualCharacter).characters
  const evolWithSkull = evolution.from?.find(x =>
    x.evolvers.find(y => y.toString().includes('skull')),
  )

  return {
    global: isNotJapex && {
      banner: `https://onepiece-treasurecruise.com/en/wp-content/uploads/sites/2/c${idNormalized}.png`,
      thumbnail: getImagePath(id, `${thumbnailserver}/glo`),
      character1: isMulti && getImagePath(id, `${thumbnailserver}/glo`, '1'),
      character2: isMulti && getImagePath(id, `${thumbnailserver}/glo`, '2'),
      combined1:
        isMulti &&
        getImagePath(id, `${thumbnailserver}/glo`, dualchars.character1.type),
      combined2:
        isMulti &&
        getImagePath(id, `${thumbnailserver}/glo`, dualchars.character2.type),
    },
    japan: isNotGloex && {
      banner: `https://onepiece-treasurecruise.com/wp-content/uploads/c${idNormalized}.png`,
      thumbnail: getImagePath(id, `${thumbnailserver}/jap`),
      character1: isMulti && getImagePath(id, `${thumbnailserver}/jap`, '1'),
      character2: isMulti && getImagePath(id, `${thumbnailserver}/jap`, '2'),
      combined1:
        isMulti &&
        getImagePath(id, `${thumbnailserver}/jap`, dualchars.character1.type),
      combined2:
        isMulti &&
        getImagePath(id, `${thumbnailserver}/jap`, dualchars.character2.type),
    },
    skull: evolWithSkull && `${thumbnailserver}/.`
  }
}
