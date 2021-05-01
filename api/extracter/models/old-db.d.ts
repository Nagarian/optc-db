import {
  Potentials,
  Rarities,
  CharacterClasses,
  RumbleStyles,
  CharacterTypes,
} from './constants'

export declare namespace OldDB {
  export type Type = typeof CharacterTypes[number]
  export type Class = typeof CharacterClasses[number]

  export type Rarity = typeof Rarities[number]

  export type RumbleStyle = typeof RumbleStyles[number]

  export type MultiClass = [Class, Class]
  export type DualClass = [[Class, Class], [Class, Class], [Class, Class]]
  export type VersusClass = [[Class, Class], [Class, Class]]
  export type UnitClass = Class | MultiClass | DualClass | VersusClass
  export type UnitType = Type | [Type, Type]

  export type BaseUnit = {
    name: string
    type: UnitType
    class: UnitClass
    stars: Rarity
    cost: number
    combo: number
    slots: number
    maxLevel: number | null
    maxEXP: number | null
    minHP: number
    minATK: number
    minRCV: number
    maxHP: number | null
    maxATK: number | null
    maxRCV: number | null
    limitHP: number | null
    limitATK: number | null
    limitRCV: number | null
    limitSlot: number
    limitCD: number
    limitexHP: number | null
    limitexATK: number | null
    limitexRCV: number | null
    limitexSlot: number
    limitexCD: number
    growth: {
      hp: number
      atk: number
      rcv: number
    }
    number: number
    limitStats: {
      hp: number[]
      atk: number[]
      rcv: number[]
      sailors: number[]
      captains: number[]
    }
    pirateFest?: {
      class?: RumbleStyle
      DEF?: number | null
      SPD?: number | null
      minCP?: null
      maxCP?: null
    }
    incomplete?: boolean
    preview?: boolean
  }

  export type LimitBreak = {
    description: string
  }

  export type PotentialKey = typeof Potentials[number]

  export type UnitPotential = {
    Name: PotentialKey
    description: [string, string, string, string, string]
  }

  export type UnitSupport = {
    Characters: string
    description: [string, string, string, string, string]
  }

  export type UnitFestAbility = {
    description: string
  }

  export type UnitFestSpecial = {
    description: string
    cooldown: number
  }

  export type UnitCooldown = [number, number]

  export type SimpleStageSpecial = string
  export type MultiStageSpecial = {
    cooldown: UnitCooldown
    description: string
  }[]
  export type DualCharacterSpecial = {
    character1: string
    character2: string
  }
  export type GloJapSpecial = {
    global: string
    japan: string
  }
  export type UnitSpecial =
    | SimpleStageSpecial
    | MultiStageSpecial
    | DualCharacterSpecial
    | GloJapSpecial

  export type SimpleCaptain = string
  export type DualCaptain = {
    character1: string
    character2: string
    combined: string
  }
  export type LimitBrokenCaptain = {
    base: string
    level1: string
    level2?: string
    level3?: string
    level4?: string
    level5?: string
    level6?: string
  }
  export type UnitCaptain =
    | undefined
    | SimpleCaptain
    | DualCaptain
    | LimitBrokenCaptain

  export type SimpleSailor = string
  export type LimitBrokenSailor = {
    base?: string
    base2?: string
    level1?: string
    level2?: string
  }
  export type DualSailor = {
    character1: string
    character2: string
    combined: string
    level1?: string
    level2?: string
  }
  export type UnitSailor =
    | undefined
    | SimpleSailor
    | DualSailor
    | LimitBrokenSailor

  export type UnitSuperSwap = {
    base: string
    super: string
    superTurns: number
  }

  export type UnitDetail = Partial<{
    captain: UnitCaptain
    captainNotes: string
    special: UnitSpecial
    specialNotes: string
    sailor: UnitSailor
    sailorNotes: string // they only contains placeholders so we don't keep them
    specialName: string
    limit: LimitBreak[]
    limitNotes: string // handled into rootNotes
    potential: UnitPotential[]
    potentialNotes: string
    support: [UnitSupport]
    supportNotes: string
    festAbility: [
      UnitFestAbility,
      UnitFestAbility,
      UnitFestAbility,
      UnitFestAbility,
      UnitFestAbility,
    ]
    festSpecial: [
      UnitFestSpecial,
      UnitFestSpecial,
      UnitFestSpecial,
      UnitFestSpecial,
      UnitFestSpecial,
      UnitFestSpecial,
      UnitFestSpecial,
      UnitFestSpecial,
      UnitFestSpecial,
      UnitFestSpecial,
    ]
    festAttackPattern: UnitFestAbility[]
    festAttackTarget: string
    festResistance: string
    swap: string | UnitSuperSwap
    swapNotes: string
    superSpecial: string
    superSpecialNotes: string
    superSpecialCriteria: string
    VSCondition: string
    VSSpecial: string
    VSSpecialNotes: string
  }>

  export type UnitEvolverMaterial = number | string
  export type UnitEvolution = {
    evolution: number | number[]
    evolvers: UnitEvolverMaterial[] | UnitEvolverMaterial[][]
  }

  export type UnitImages = {
    thumbnail?: string
    full?: string
  }

  export type UnitFlags = Partial<{
    /** global available */
    global: 1

    /** Rare recruit pools (include all other rr) */
    rr: 1
    /** rare recruit */
    rro: 1
    /** limiter rare recruit */
    lrr: 1
    /** Support limited rare recruit */
    slrr: 1
    /** TM rare recruit */
    tmlrr: 1
    /** Kizuna rare recruit */
    kclrr: 1
    /** Pirate Festival rare recruit */
    pflrr: 1

    /** Rayleigh shop */
    shop: 1
    /** TM trade port */
    tmshop: 1

    /** ??? */
    promo: 1
    /** Special characters (gifted mostly) */
    special: 1

    inkable: 1

    /** Manually added */
    gloOnly: 1
    japOnly: 1
  }>

  export type UnitFamily = string | string[]

  export type ExtendedUnit = BaseUnit & {
    id: number
    dbId: number
    images: UnitImages
    evolution?: UnitEvolution
    cooldown?: UnitCooldown
    detail: UnitDetail
    flags: UnitFlags
    family?: UnitFamily
    evolutionMap: number[]
    dualCharacters?: ExtendedUnit[]
    gamewith?: number
    aliases?: string[]
  }
}
