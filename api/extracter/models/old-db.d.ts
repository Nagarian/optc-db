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

  export type UnitLastTap = {
    condition: string
    description: string[]
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
    lastTap?: UnitLastTap[]
    lastTapNotes?: string
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
      | 'Critical Hit'
      | 'Guard'
      | 'Accuracy'
      | 'Blow Away'
      | 'Special CT'
      | 'Silence'
      | 'Provoke'
      | 'Paralysis'
      | 'Damage Over Time'
      | 'Action Bind'
      | 'Half Stats'
      | 'Haste'
      | 'Counter'
      | 'near'

    export type Direction = 'forward' | 'radial' | 'sideways'
    export type Size = 'large' | 'small' | 'medium'

    export type Attribute = RumbleStatType | ColorType | AdditionalCriteriaType

    export type ResilienceType = 'debuff' | 'healing' | 'damage'

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

    export type ConditionTeam = 'crew' | 'enemies'

    export type EffectEnum =
      | 'buff'
      | 'debuff'
      | 'penalty'
      | 'hinderance'
      | 'damage'
      | 'recharge'
      | 'boon'

    export type TargetingPriority = 'highest' | 'lowest' | 'above' | 'below'

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
      global?: Unit
      id: number
      japan?: Unit
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
    }

    export type Ability = {
      effects: Effect[]
    }

    export type Condition = {
      comparator?: ConditionComparator
      stat?: Attribute
      type: ConditionType
      team?: ConditionTeam
      count?: number
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
      chance: number
      type: 'debuff'
    }

    export type DamageResilience = {
      attribute?: ColorType | ClassType | 'all'
      percentage: number
      type: 'damage'
    }

    export type HealingResilience = {
      condition?: Condition
      amount: number
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
      attributes?: Attribute[]
      chance?: number
      duration?: number
      targeting: Targeting
      amount?: number
      level?: number
      range?: Range
      condition?: Condition
      defbypass?: boolean
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
    } & {
      [additionalKey: string]: number[]
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

    // export type Drop = {
    //   name: string
    //   dropID: string
    //   thumb: number
    //   global: boolean
    //   nakama: number
    //   gamewith: number
    //   slefty: string
    //   day: number // booster
    //   completion?: string //story
    //   condition: string //fortnight
    //   challenge: string
    //   challengeData: string[][]
    //   showManual: boolean
    //   [stage: string]: number[]
    // }

    // export type DropDB = Record<string, Drop[]>
  }
}
