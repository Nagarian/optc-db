import {
  Potentials,
  Rarities,
  CharacterClasses,
  CharacterTypes,
} from '../../models/constants'

export declare namespace OldDB {
  export type Type = typeof CharacterTypes[number]
  export type Class = typeof CharacterClasses[number]

  export type Rarity = typeof Rarities[number]

  export type RumbleStyle = 'ATK' | 'DEF' | 'RCV' | 'DBF' | 'SPT'

  export type MultiClass = [Class, Class]
  export type SingleClass = Class | MultiClass
  export type DualClass = [SingleClass, SingleClass, SingleClass]
  export type VersusClass = [SingleClass, SingleClass]
  export type UnitClass = SingleClass | DualClass | VersusClass
  export type UnitType = Type | [Type, Type]

  export type BaseUnit = {
    name: string
    type: UnitType
    class: UnitClass
    stars: Rarity
    families: string[] | null
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
    llbmaxHP: number | null
    llbmaxATK: number | null
    llbmaxRCV: number | null
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
    pirateFest2?: {
      class?: RumbleStyle
      DEF?: number | null
      SPD?: number | null
      minCP?: null
      maxCP?: null
    } | null
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

  export type UnitLastTap = {
    condition: string
    description: string[]
  }

  export type UnitSuperTandem = {
    condition?: string
    characterCondition: string[]
    description: string[]
  }

  export type UnitSupport = {
    Characters: string
    description: [string, string, string, string, string]
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
  export type LevelLBSpecial = {
    base: SimpleStageSpecial | MultiStageSpecial | DualCharacterSpecial
    llbbase: SimpleStageSpecial | MultiStageSpecial | DualCharacterSpecial
  }
  export type UnitSpecial =
    | SimpleStageSpecial
    | MultiStageSpecial
    | DualCharacterSpecial
    | LevelLBSpecial

  export type SimpleCaptain = string
  export type DualCaptain = {
    character1: string
    character2: string
    combined: string
  }
  export type LimitBrokenCaptain = {
    base: string
    level1?: string
    level2?: string
    level3?: string
    level4?: string
    level5?: string
    level6?: string
    llbbase?: string
    llblevel1?: string
  }
  export type UnitCaptain =
    | undefined
    | SimpleCaptain
    | DualCaptain
    | LimitBrokenCaptain

  export type SimpleSailor = string
  export type LimitBrokenSailor = {
    base?: string | null
    base2?: string | null
    level1?: string | null
    level2?: string | null
    llbbase?: string
    llblevel1?: string
    llblevel2?: string
  }
  export type DualSailor = {
    character1: string | null
    character2: string | null
    combined: string | null
    level1?: string | null
    level2?: string | null
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

  export type UnitLevelLimitBreak = null | Partial<{
    rAbility: boolean
    rSpecial: boolean
    rResilience: boolean
    captain: UnitCaptain
    special: UnitSpecial
    sailor: UnitSailor
  }>

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
    lastTap?: UnitLastTap
    lastTapNotes?: string
    superTandem?: UnitSuperTandem
    lLimit?: UnitLevelLimitBreak[]
    support: [UnitSupport]
    supportNotes: string
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
    /** Super limited rare recruit */
    superlrr: 1

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

    tm: 1
    kizuna: 1
    rumble: 1
    story: 1
    fortnight: 1
    coliseum: 1
    arena: 1
    raid: 1
    ambush: 1

    // events: 1
  }>

  export type UnitFamily = Record<number, string[]>

  export type ExtendedUnit = BaseUnit & {
    id: number
    dbId: number
    images: UnitImages
    evolution?: UnitEvolution
    cooldown?: UnitCooldown
    detail: UnitDetail
    flags: UnitFlags
    evolutionMap: number[]
    dualCharacters?: ExtendedUnit[]
    gamewith?: number
    aliases?: string[]
    rumble?: PirateFest.Unit
  }

  export namespace PirateFest {
    export type ColorType = '[STR]' | '[DEX]' | '[QCK]' | '[PSY]' | '[INT]'
    export type ClassType =
      | 'Slasher'
      | 'Fighter'
      | 'Striker'
      | 'Shooter'
      | 'Cerebral'
      | 'Free Spirit'
      | 'Driven'
      | 'Powerhouse'
    export type RumbleStatType = 'SPD' | 'ATK' | 'DEF' | 'HP' | 'RCV'
    export type RumbleType = 'DBF' | 'ATK' | 'SPT' | 'DEF' | 'RCV'
    export type AdditionalCriteriaType =
      | 'Accuracy'
      | 'Action Bind'
      | 'Blow Away'
      | 'Confusion'
      | 'Counter'
      | 'Critical Hit'
      | 'Damage Over Time'
      | 'Guard'
      | 'Half ATK'
      | 'Half SPD'
      | 'Half Stats'
      | 'Haste'
      | 'heal'
      | 'hit'
      | 'near'
      | 'Paralysis'
      | 'Provoke'
      | 'Revive'
      | 'Shield'
      | 'Silence'
      | 'Special CT'
      | 'takes damage'

    export type Direction = 'forward' | 'radial' | 'sideways'
    export type Size = 'large' | 'small' | 'medium'

    export type Attribute = RumbleStatType | ColorType | AdditionalCriteriaType

    export type ConditionComparator =
      | 'above'
      | 'below'
      | 'remaining'
      | 'first'
      | 'after'
      | 'more'
      | 'less'

    export type ConditionType =
      | 'stat'
      | 'time'
      | 'crew'
      | 'enemies'
      | 'trigger'
      | 'defeat'
      | 'character'

    export type ConditionTeam = 'crew' | 'enemies'

    export type EffectEnum =
      | 'buff'
      | 'boon'
      | 'cleanse'
      | 'damage'
      | 'debuff'
      | 'hinderance'
      | 'penalty'
      | 'recharge'

    export type TargetingPriority = 'highest' | 'lowest' | 'above' | 'below' | 'exactly'

    export type TargetType = 'self' | 'crew' | 'enemies'
    export type TargetElement = ColorType | ClassType | TargetType

    export type Action = 'attack' | 'heal'
    export type Area = 'Self' | 'Small' | 'Large' | 'Medium'
    export type PatternType = 'Normal' | 'Power' | 'Full'

    export type PirateRumbleData = {
      units: (Unit | Reference)[]
    }

    export type Reference = {
      id: number
      basedOn: number
    }
    export type Unit = {
      ability: [Ability, Ability, Ability, Ability, Ability]
      id: number
      pattern: [Pattern, ...Pattern[]]
      special: [
        Special,
        Special,
        Special,
        Special,
        Special,
        Special,
        Special,
        Special,
        Special,
        Special,
      ]
      stats: Stats
      target: TargetClass
      resilience?: Resilience[]
      llbability?: [Ability, Ability, Ability, Ability, Ability]
      llbresilience?: Resilience[]
      llbspecial?: [
        Special,
        Special,
        Special,
        Special,
        Special,
        Special,
        Special,
        Special,
        Special,
        Special,
      ]
    }

    export type Ability = {
      effects: Effect[]
    }

    export type Condition = {
      comparator?: ConditionComparator
      count?: number
      families?: string[]
      relative?: boolean
      stat?: Attribute
      team?: ConditionTeam
      type: ConditionType
    }

    export type Pattern = AttackPattern | HealPattern

    export type HealPattern = {
      action: 'heal'
      area: Area
      level: number
    }

    export type AttackPattern = {
      action: 'attack'
      type: PatternType
    }

    export type Resilience =
      | DebuffResilience
      | DamageResilience
      | HealingResilience

    export type DebuffResilience = {
      attribute: Attribute
      condition?: Condition
      chance: number
      type: 'debuff'
    }

    export type DamageResilience = {
      attribute?: ColorType | ClassType | 'all'
      percentage: number
      type: 'damage'
    }

    export type HealingResilience = {
      amount: number
      condition?: Condition
      interval: number
      type: 'healing'
    }

    export type Special = {
      cooldown: number
      effects: Effect[]
    }

    export type Effect =
      | CommonEffect
      | AttackEffectType
      | RechargeEffectType
      | EffectOverride

    export type BasicEffect = {
      amount?: number
      attributes?: Attribute[]
      chance?: number
      condition?: Condition
      defbypass?: boolean
      duration?: number
      interval?: number
      level?: number
      range?: Range
      repeat?: number
      targeting: Targeting
    }

    export type CommonEffect = BasicEffect & {
      effect: EffectEnum
    }

    export type AttackEffectType = CommonEffect & {
      effect: 'damage'
      type: 'fixed' | 'cut' | 'atk' | 'time'
    }

    export type RechargeEffectType = CommonEffect & {
      effect: 'recharge'
      type: 'fixed' | 'percentage' | 'Special CT' | 'RCV'
    }

    export type EffectOverride = {
      override?: Partial<BasicEffect>
    }

    export type Targeting = {
      count?: number
      priority?: TargetingPriority
      percentage?: number
      stat?: Attribute
      targets: TargetElement[]
      excludes?: TargetElement[]
    }

    export type Range = {
      direction: Direction
      size: Size
    }

    export type Stats = {
      def: number
      rumbleType: RumbleType
      spd: number
      cost?: number
    }

    export type TargetClass = {
      comparator?: TargetingPriority
      criteria: Attribute
    }
  }

  // ADDITIONAL TYPES

  export type BaseUnitEvolution = Record<number, UnitEvolution>
  export type Aliases = Record<number, string[]>
  export type GameWith = (number | null)[]

  export namespace Drop {
    export type BaseDropEvent = {
      name: string
      dropID: string
      thumb: number
      global?: boolean
      nakama?: number
      gamewith?: number
      slefty?: string
      day?: number // booster
      completion?: string //story
      condition?: string //fortnight
      challenge?: string
      challengeData?: string[][]
      showManual?: boolean
      [stage: string]: number[]
    }

    export type BaseDrops = { [eventType: string]: BaseDropEvent[] }

    export type EventDrop = {
      id: string
      name: string
      icon: string
      units: number[]
      manual: number[]
    }

    export type EventDropLight = number[]

    export type BookEventDrop = EventDrop & {
      category: Type
    }
  }
}
