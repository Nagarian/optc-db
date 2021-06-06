import {
  CharacterClasses,
  CharacterColors,
  CharacterTypes,
  Potentials,
  Rarities,
  RumbleStyles,
} from './constants'
import { Flags, LBPathTypes, SupportTypes } from './raw-constant'

export declare namespace RawDB {
  export type ColorType = typeof CharacterColors[number]
  export type Type = typeof CharacterTypes[number]
  export type ClassKey = typeof CharacterClasses[number]
  export type Class = [ClassKey?, ClassKey?]
  export type Rarity = typeof Rarities[number]
  export type RumbleStyle = typeof RumbleStyles[number]

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

  export type EvolutionMaterial = string | number
  export type Evolution = {
    id: number
    evolvers: EvolutionMaterial[]
  }

  export type CaptainUpgrade = {
    description: string
  }

  export type Captain = {
    name: string
    description: string
    notes?: string
    upgrades?: CaptainUpgrade[]
  }

  export type SuperType = {
    criteria: string
    description: string
    notes?: string
  }

  export type SpecialStage = {
    description: string
    cooldown: number
  }

  export type Special = {
    name: string
    description: string
    cooldown?: number
    maxLevel?: number
    notes?: string
    stages?: SpecialStage[]
  }

  export type Sailor = {
    description: string
    notes?: string
  }

  export type SupportType = typeof SupportTypes[number]

  export type SupportLevel = {
    description?: string
    value?: number
    reduction?: {
      type: Type
      value: number
    }
  }

  export type Support = {
    type: SupportType[]
    criteria: string
    levels: SupportLevel[]
    notes?: string
  }

  export namespace LB {
    export type PathType = typeof LBPathTypes[number]

    export type Path = {
      type: PathType
      value?: number
    }

    export type PotentialLevel = {
      threshold?: number
      value?: number
      reduction?: number
    }

    export type PotentialType = typeof Potentials[number]

    export type Potential = {
      type: PotentialType
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
    gamewithId?: number
    officialJapan?: string
  }

  export type DualUnitDetail = {
    name: string
    japanName?: string
    frenchName?: string
    type: ColorType
    class: Class
    stats: Statistics
    captain?: Captain
    special?: Special
    sailor?: Sailor[]
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

  export type DualUnitNode = {
    character1: DualUnitDetail
    character2: DualUnitDetail
    swap: Swap
  }

  export type Versus = {
    description: string
    notes?: string
  }

  export type VersusUnitDetail = {
    name: string
    japanName?: string
    frenchName?: string
    type: ColorType
    class: Class
    stats: Statistics
    captain?: Captain
    special?: Special
    sailor?: Sailor[]
    rumble?: PirateRumble.Rumble
    versus: Versus
  }

  export type VersusUnitNode = {
    character1: VersusUnitDetail
    character2: VersusUnitDetail
    criteria: string
  }

  export type BaseCharacter = {
    $schema?: string
    oldDbId?: number
    name: string
    japanName?: string
    frenchName?: string
    family: string[]
    type: Type
    class: Class
    rarity: Rarity
    cost: number
    slots: number
    maxLevel: number
    maxExp?: number
    stats: Statistics
    flags: Flag[]
    links?: AffiliatedLinks
    aliases: string[]
    notes?: string

    limitBreak?: LB.LimitBreak
    evolution?: Evolution[]
  }

  export type SingleCharacter = BaseCharacter & {
    type: ColorType
    captain?: Captain
    superType?: SuperType
    special?: Special
    sailor?: Sailor[]
    support?: Support
    rumble?: PirateRumble.Rumble
  }

  export type DualCharacter = BaseCharacter & {
    type: 'DUAL'
    captain?: Captain
    special?: Special
    sailor?: Sailor[]
    rumble?: PirateRumble.Rumble
    characters: DualUnitNode
  }

  export type VersusCaptain = {
    name: string
  }

  export type VersusCharacter = BaseCharacter & {
    type: 'VS'
    captain: VersusCaptain
    characters: VersusUnitNode
  }

  export type Character = SingleCharacter | DualCharacter | VersusCharacter

  export type DBCharacter = [number, Character]

  export namespace PirateRumble {
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

    export type ResilienceType = 'debuff' | 'healing' | 'damage'
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
    }

    export type TargetClass = {
      comparator?: TargetingPriority
      criteria: Attribute
    }
  }

  // export type DropAffiliatedLink = {
  //   nakama?: number
  //   gamewith?: number
  //   slefty?: string
  // }

  // export type Stage = {
  //   name: string
  //   links?: DropAffiliatedLink
  //   icon: number
  //   global?: boolean
  //   dropId: number
  // }

  // export type Drop = {
  //   name: string
  //   key: string
  //   stages: Stage[]
  // }
}
