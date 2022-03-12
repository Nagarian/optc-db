import { RawDB } from '../../raw-db/models/raw-db'
import { OldDB } from '../models/old-db'

export function extractFlags(unit: OldDB.ExtendedUnit): RawDB.Flag[] {
  let result: RawDB.Flag[] = []

  const add = (flag?: RawDB.Flag | RawDB.Flag[]) => {
    if (!flag) {
      return
    }

    if (Array.isArray(flag)) {
      result = [...result, ...flag]
    } else {
      result.push(flag)
    }
  }

  add(extractRareRecruitFlags(unit.flags))
  add(unit.flags.inkable && 'inkable')
  add(unit.flags.shop && 'shop')
  add(unit.flags.tmshop && ['tm', 'shop'])
  add(unit.flags.gloOnly && 'gloex')
  add(unit.flags.japOnly && 'japex')

  add(unit.flags.special && 'special')
  add(extractRemovedFlag(unit))

  add(unit.flags.ambush && 'ambush')
  add(unit.flags.arena && 'arena')
  add(unit.flags.coliseum && 'coliseum')
  add(unit.flags.fortnight && 'fortnight')
  add(unit.flags.kizuna && 'kizuna')
  add(unit.flags.raid && 'raid')
  add(unit.flags.tm && 'tm')

  return [...new Set(result)]
}

function extractRareRecruitFlags(
  unitFlags: OldDB.UnitFlags,
): RawDB.Flag[] | undefined {
  if (unitFlags.tmlrr) return ['sugo', 'tm']
  if (unitFlags.kclrr) return ['sugo', 'kizuna']
  if (unitFlags.pflrr) return ['sugo', 'rumble']
  if (unitFlags.slrr) return ['sugo', 'support']
  // we put lrr only here because too many units have it but they wouldn't
  if (unitFlags.lrr || unitFlags.superlrr) return ['sugo', 'limited']
  if (unitFlags.rr || unitFlags.rro) return ['sugo']

  return undefined
}

export const flagNotes: Record<number, [RawDB.Flag, string]> = {
  //strong world bat.ch
  519: [
    'removed',
    'Strong World Batch has been entirely replaced. So this characte is now available with a different artwork and id #1114.',
  ],
  520: [
    'removed',
    'Strong World Batch has been entirely replaced. So this characte is now available with a different artwork and id #1115.',
  ],
  521: [
    'removed',
    'Strong World Batch has been entirely replaced. So this characte is now available with a different artwork and id #1116.',
  ],
  522: [
    'removed',
    'Strong World Batch has been entirely replaced. So this characte is now available with a different artwork and id #1117.',
  ],
  523: [
    'removed',
    'Strong World Batch has been entirely replaced. So this characte is now available with a different artwork and id #1118.',
  ],
  524: [
    'removed',
    'Strong World Batch has been entirely replaced. So this characte is now available with a different artwork and id #1119.',
  ],
  525: [
    'removed',
    'Strong World Batch has been entirely replaced. So this characte is now available with a different artwork and id #1172.',
  ],
  526: [
    'removed',
    'Strong World Batch has been entirely replaced. So this characte is now available with a different artwork and id #1173.',
  ],
  527: [
    'removed',
    'Strong World Batch has been entirely replaced. So this characte is now available with a different artwork and id #1176.',
  ],
  528: [
    'removed',
    'Strong World Batch has been entirely replaced. So this characte is now available with a different artwork and id #1177.',
  ],
  553: [
    'removed',
    'Strong World Batch has been entirely replaced. So this characte is now available with a different artwork and id #1174.',
  ],
  554: [
    'removed',
    'Strong World Batch has been entirely replaced. So this characte is now available with a different artwork and id #1175.',
  ],
  555: [
    'removed',
    'Strong World Batch has been entirely replaced. So this characte is now available with a different artwork and id #1209.',
  ],
  556: [
    'removed',
    'Strong World Batch has been entirely replaced. So this characte is now available with a different artwork and id #1210.',
  ],
  557: [
    'removed',
    'Strong World Batch has been entirely replaced. So this characte is now available with a different artwork and id #1207.',
  ],
  558: [
    'removed',
    'Strong World Batch has been entirely replaced. So this characte is now available with a different artwork and id #1208.',
  ],
  559: [
    'removed',
    'Strong World Batch has been entirely replaced. So this characte is now available with a different artwork and id #1211.',
  ],
  560: [
    'removed',
    'Strong World Batch has been entirely replaced. So this characte is now available with a different artwork and id #1212.',
  ],
  // voyage log batch
  577: [
    'removed',
    'Voyage Log/Dream Batch has been removed, except this Luffy which has been replaced with a different artwork and id #1120.',
  ],
  578: [
    'removed',
    'Voyage Log/Dream Batch has been removed, except this Luffy which has been replaced with a different artwork and id #1121.',
  ],
  650: [
    'removed',
    'Voyage Log/Dream Batch has been removed, except this Nami which has been replaced (only on global) with a different artwork and id #5001.',
  ],
  651: [
    'removed',
    'Voyage Log/Dream Batch has been removed, except this Nami which has been replaced (only on global) with a different artwork and id #5002.',
  ],
  660: [
    'removed',
    'Voyage Log/Dream Batch has been removed, except this Usopp which has been replaced (only on global) with a different artwork and id #5003.',
  ],
  661: [
    'removed',
    'Voyage Log/Dream Batch has been removed, except this Usopp which has been replaced (only on global) with a different artwork and id #5004.',
  ],
  579: [
    'removed',
    'Voyage Log/Dream Batch has been removed, except this Zoro which has been replaced (only on global) with a different artwork and id #5005.',
  ],
  580: [
    'removed',
    'Voyage Log/Dream Batch has been removed, except this Zoro which has been replaced (only on global) with a different artwork and id #5006.',
  ],
  596: [
    'removed',
    'Voyage Log/Dream Batch has been removed, except this Chopper which has been replaced (only on global) with a different artwork and id #5007.',
  ],
  597: [
    'removed',
    'Voyage Log/Dream Batch has been removed, except this Chopper which has been replaced (only on global) with a different artwork and id #5008.',
  ],
  604: [
    'removed',
    'Voyage Log/Dream Batch has been removed, except Log Luffy and Nami, Usopp, Zoro and Chopper (only on global).',
  ],
  605: [
    'removed',
    'Voyage Log/Dream Batch has been removed, except Log Luffy and Nami, Usopp, Zoro and Chopper (only on global).',
  ],
  612: [
    'removed',
    'Voyage Log/Dream Batch has been removed, except Log Luffy and Nami, Usopp, Zoro and Chopper (only on global).',
  ],
  613: [
    'removed',
    'Voyage Log/Dream Batch has been removed, except Log Luffy and Nami, Usopp, Zoro and Chopper (only on global).',
  ],
  678: [
    'removed',
    'Voyage Log/Dream Batch has been removed, except Log Luffy and Nami, Usopp, Zoro and Chopper (only on global).',
  ],
  679: [
    'removed',
    'Voyage Log/Dream Batch has been removed, except Log Luffy and Nami, Usopp, Zoro and Chopper (only on global).',
  ],
  710: [
    'removed',
    'Voyage Log/Dream Batch has been removed, except Log Luffy and Nami, Usopp, Zoro and Chopper (only on global).',
  ],
  711: [
    'removed',
    'Voyage Log/Dream Batch has been removed, except Log Luffy and Nami, Usopp, Zoro and Chopper (only on global).',
  ],
  725: [
    'removed',
    'Voyage Log/Dream Batch has been removed, except Log Luffy and Nami, Usopp, Zoro and Chopper (only on global).',
  ],
  726: [
    'removed',
    'Voyage Log/Dream Batch has been removed, except Log Luffy and Nami, Usopp, Zoro and Chopper (only on global).',
  ],
  744: [
    'removed',
    'Voyage Log/Dream Batch has been removed, except Log Luffy and Nami, Usopp, Zoro and Chopper (only on global).',
  ],
  745: [
    'removed',
    'Voyage Log/Dream Batch has been removed, except Log Luffy and Nami, Usopp, Zoro and Chopper (only on global).',
  ],
  801: [
    'removed',
    'Voyage Log/Dream Batch has been removed, except Log Luffy and Nami, Usopp, Zoro and Chopper (only on global).',
  ],
  802: [
    'removed',
    'Voyage Log/Dream Batch has been removed, except Log Luffy and Nami, Usopp, Zoro and Chopper (only on global).',
  ],
  1677: [
    'removed',
    'Voyage Log/Dream Batch has been removed, except Log Luffy and Nami, Usopp, Zoro and Chopper (only on global).',
  ],
  1678: [
    'removed',
    'Voyage Log/Dream Batch has been removed, except Log Luffy and Nami, Usopp, Zoro and Chopper (only on global).',
  ],
}

function extractRemovedFlag(unit: OldDB.ExtendedUnit): RawDB.Flag | undefined {
  const [flag] = flagNotes[unit.id] ?? []
  return flag
}