import {
  CharacterClasses,
  CharacterColors,
  CharacterTypes,
  Potentials,
  Rarities,
} from '../../models/constants'
import { FamiliesKey } from '../../models/constants-families'
import {
  Flags,
  LBPathTypes,
  StatsTypes,
  EvolutionSkulls,
} from '../../raw-db/models/raw-constant'

export declare namespace FinalDB {
  export type ColorType = typeof CharacterColors[number]
  export type CharacterType = ColorType | 'DUAL' | 'VS'
  export type Type = typeof CharacterTypes[number]
  export type ClassKey = typeof CharacterClasses[number]
  export type Class = [ClassKey?, ClassKey?]
  export type Rarity = typeof Rarities[number]

  export type Flag = typeof Flags[number]

  export type Statistic = {
    hp: number
    atk: number
    rcv: number
  }
  export type Statistics = {
    combo: number
    minLvl?: Statistic
    maxLvl?: Statistic
  }

  export type Evolution = {
    map: number[]
    from?: EvolutionCharacter[]
    to?: EvolutionCharacter[]
  }

  export type EvolutionSkull = typeof EvolutionSkulls[number]
  export type EvolutionMaterial = EvolutionSkull | number
  export type EvolutionCharacter = {
    id: number
    evolvers: EvolutionMaterial[]
  }

  export type CaptainUpgrade = {
    description: string
    unlockedAt: number
    keyLocked: boolean
  }

  export type Captain = {
    name: string
    description: string
    notes?: string
    upgrades?: CaptainUpgrade[]
  }

  export type SuperSpecial = {
    criteria: string
    description: string
    notes?: string
  }

  export type SpecialStage = {
    description: string
    cooldown: SpecialCooldown
  }

  export type SpecialCooldown = {
    initial: number
    max: number
    lbMax?: number
    keyLbMax?: number
  }

  export type Special = {
    name: string
    description: string
    cooldown: SpecialCooldown
    maxLevel: number
    notes?: string
    stages?: SpecialStage[]
  }

  export type Sailor = {
    description: string
    notes?: string
    unlockedAt?: number
  }

  export type SupportLevel = {
    value?: number
    reduction?: number
    description: string
  }

  export type StatsType = typeof StatsTypes[number]

  export type SupportType = 'stats' | 'descriptive'

  export type Support = {
    type: SupportType
    criteria: string
    statsTypes?: StatsType[]
    defenseType?: ColorType
    levels: [
      SupportLevel,
      SupportLevel,
      SupportLevel,
      SupportLevel,
      SupportLevel,
    ]
    notes?: string
  }

  export namespace LB {
    export type PathType = typeof LBPathTypes[number]

    export type Path = {
      type: PathType
      value?: number
    }

    export type PotentialLevel = {
      description: string
      threshold?: number
      value?: number
      reduction?: number
    }

    export type PotentialType = typeof Potentials[number]

    export type PotentialVariant = 'up to'

    export type Potential = {
      type: PotentialType
      variant?: PotentialVariant
      levels: PotentialLevel[]
    }

    export type LastTapLevel = {
      description: string
    }

    export type LastTap = {
      criteria: string
      levels: LastTapLevel[]
      notes?: string
    }

    export type LimitBreak = {
      path: Path[]
      potentials: Potential[]
      lastTap?: LastTap
    }
  }

  export type AffiliatedLinks = {
    officialGlobal?: string
    officialJapan?: string
    gamewith?: string
  }

  export type CharacterDetail = {
    name: string
    japanName?: string
    frenchName?: string
    type: CharacterType
    class: Class
    stats: Statistics
    captain?: Captain
    special?: Special
    sailor?: Sailor[]
    rumble?: PirateRumble.Rumble
  }

  export type SuperSwap = {
    criteria: number
    description: string
  }

  export type Swap = {
    description: string
    super?: SuperSwap
    notes?: string
  }

  export type Versus = {
    description: string
    notes?: string
  }

  export type MultiCharacterNode = CharacterDetail & {
    versus: Versus
  }

  export type MultiCharacterDetail = {
    character1: MultiCharacterNode
    character2: MultiCharacterNode
    swap?: Swap
    criteria?: string
  }

  export type Family = typeof FamiliesKey[number]

  export type FamilyNode = {
    key: Family
    aliases: string[]
  }

  export type CharacterFamily = {
    id: number
    characters: FamilyNode[]
  }

  export type Character = CharacterDetail & {
    id: number
    oldDbId?: number
    family: CharacterFamily
    rarity: Rarity
    cost: number
    slots: number
    maxLevel: number
    maxExp?: number
    flags: Flag[]
    links?: AffiliatedLinks
    aliases: string[]
    notes?: string

    superSpecial?: SuperSpecial
    support?: Support
    characters?: MultiCharacterDetail

    limitBreak?: LB.LimitBreak
    evolution?: Evolution
  }

  export namespace PirateRumble {
    export type RumbleStatType = 'SPD' | 'ATK' | 'DEF' | 'HP' | 'RCV'
    export type RumbleType = 'DBF' | 'ATK' | 'SPT' | 'DEF' | 'RCV'
    export type AdditionalCriteriaType =
      | 'Accuracy'
      | 'Action Bind'
      | 'Blow Away'
      | 'Counter'
      | 'Critical Hit'
      | 'Damage Over Time'
      | 'Guard'
      | 'Half Stats'
      | 'Haste'
      | 'heal'
      | 'hit'
      | 'near'
      | 'Paralysis'
      | 'Provoke'
      | 'Revive'
      | 'Silence'
      | 'Special CT'

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

    export type TargetingPriority = 'highest' | 'lowest' | 'above' | 'below'

    export type TargetType = 'self' | 'crew' | 'enemies'
    export type TargetElement = ColorType | ClassKey | TargetType

    export type Action = 'attack' | 'heal'
    export type Area = 'Self' | 'Small' | 'Large' | 'Medium'
    export type PatternType = 'Normal' | 'Power' | 'Full'

    export type Rumble = {
      ability: [Ability, Ability, Ability, Ability, Ability]
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
      families?: Family[]
    }

    export type Pattern = AttackPattern | HealPattern

    export type HealPattern = {
      description: string
      action: 'heal'
      area: Area
      level: number
    }

    export type AttackPattern = {
      description: string
      action: 'attack'
      type: PatternType
    }

    export type ResilienceType = 'debuff' | 'healing' | 'damage'
    export type Resilience =
      | DebuffResilience
      | DamageResilience
      | HealingResilience

    export type DebuffResilience = {
      description: string
      attribute: Attribute
      chance: number
      type: 'debuff'
    }

    export type DamageResilience = {
      description: string
      attribute?: ColorType | ClassKey | 'all'
      percentage: number
      type: 'damage'
    }

    export type HealingResilience = {
      description: string
      condition?: Condition
      amount: number
      interval: number
      type: 'healing'
    }

    export type Special = {
      cooldown: number
      effects: Effect[]
    }

    export type Effect = CommonEffect | AttackEffectType | RechargeEffectType

    export type BasicEffect = {
      description: string
      attributes?: Attribute[]
      chance?: number
      duration?: number
      targeting: Targeting
      amount?: number
      interval?: number
      level?: number
      range?: Range
      condition?: Condition
      defbypass?: boolean
      repeat?: number
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
      cost: number
    }

    export type TargetClass = {
      description: string
      comparator?: TargetingPriority
      criteria: Attribute
    }
  }
}
