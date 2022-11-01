import {
  CharacterClasses,
  CharacterColors,
  CharacterTypes,
  Potentials,
  Rarities,
} from '../../models/constants'
import { FamiliesKey } from '../../models/constants-families'
import {
  CommonLBPathTypes,
  EvolutionSkulls,
  Flags,
  LBPathTypes,
  StatsTypes,
} from './raw-constant'

export declare namespace RawDB {
  export type ColorType = typeof CharacterColors[number]
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

  export type EvolutionSkull = typeof EvolutionSkulls[number]
  export type EvolutionMaterial = EvolutionSkull | number
  export type Evolution = {
    id: number
    evolvers: EvolutionMaterial[]
  }

  export type CaptainDescription = {
    description: string
  }

  export type Captain = {
    name: string
    /**
     * Always put the base description here, that also apply to TM characters
     */
    description: string
    notes?: string
  }

  export type SuperSpecial = {
    criteria: string
    description: string
    notes?: string
  }

  export type SpecialDescription = {
    description: string
    cooldown: number
  }

  export type Special = {
    name: string
    /**
     * Always put the latest special stage here
     */
    description: string
    cooldown?: number
    maxLevel?: number
    notes?: string
    /**
     * Put stage by ascending order (ie: 1 -> 6) but without the latest you have already specified above
     */
    stages?: SpecialDescription[]
  }

  export type DualUnitSpecial = {
    name: string
    description: string
    notes?: string
    stages?: SpecialDescription[]
  }

  export type SailorDescription = {
    description: string
    notes?: string
  }

  export type Sailor = [SailorDescription, SailorDescription?]

  export type StatSupportLevel = {
    value: number
    reduction?: number
    description?: string
  }

  export type StatsType = typeof StatsTypes[number]

  export type StatsSupport = {
    type: 'stats'
    criteria: string
    statsTypes: StatsType[]
    defenseType?: ColorType
    levels: [
      StatSupportLevel,
      StatSupportLevel,
      StatSupportLevel,
      StatSupportLevel,
      StatSupportLevel,
    ]
    notes?: string
  }

  export type DescriptiveSupport = {
    type: 'descriptive'
    criteria: string
    levels: [string, string, string, string, string]
    notes?: string
  }

  export type Support = DescriptiveSupport | StatsSupport

  export namespace LB {
    export type PathType = typeof LBPathTypes[number]
    export type CommonPathType = typeof CommonLBPathTypes[number]

    export type HpPath = { hp: number }
    export type AtkPath = { atk: number }
    export type RcvPath = { rcv: number }
    export type SlotPath = { slot: number }
    export type CooldownPath = { cooldown: number }
    export type KeyPath = { key: number }
    export type CaptainPath = { captain: CaptainDescription }
    export type CommonPath = { type: CommonPathType }

    export type Path =
      | HpPath
      | AtkPath
      | RcvPath
      | SlotPath
      | CooldownPath
      | KeyPath
      | CaptainPath
      | CommonPath

    export type PotentialLevel = {
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

    export type SuperTandemLevel = {
      criteria: string
      description: string
    }

    export type SuperTandem = {
      levels: SuperTandemLevel[]
      notes?: string
    }

    export type LimitBreak = {
      path: Path[]
      potentials: Potential[]
      lastTap?: LastTap
      superTandem?: SuperTandem
    }
  }

  export type AffiliatedLinks = {
    gamewithId?: number
  }

  export type DualUnitDetail = {
    name: string
    japanName?: string
    frenchName?: string
    type: ColorType
    class: Class
    stats: Statistics
    captain?: Captain
    special?: DualUnitSpecial
    sailor?: Sailor
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

  export type LevelLimitBreak = Partial<{
    rumble: Partial<Omit<PirateRumble.Rumble, 'stats'>>
    captain: CaptainDescription[]
    special: Partial<Special>
    sailor: Partial<{
      sailor1: SailorDescription
      sailor2: SailorDescription
    }>
  }>

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
    sailor?: Sailor
    rumble?: PirateRumble.Rumble
    versus: Versus
  }

  export type VersusUnitNode = {
    character1: VersusUnitDetail
    character2: VersusUnitDetail
    criteria: string
  }

  export type Family = typeof FamiliesKey[number]

  export type BaseCharacter = {
    oldDbId?: number
    name: string
    japanName?: string
    frenchName?: string
    family: Family[]
    // type: Type
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
    levelLimitBreak?: LevelLimitBreak[]
    evolution?: Evolution[]
  }

  export type SingleCharacter = BaseCharacter & {
    type: ColorType
    class: Class
    captain?: Captain
    superSpecial?: SuperSpecial
    special?: Special
    sailor?: Sailor
    support?: Support
    rumble?: PirateRumble.Rumble
  }

  export type DualCharacter = BaseCharacter & {
    type: 'DUAL'
    class: Class
    captain?: Captain
    special?: Special
    sailor?: Sailor
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

    export type GpConditionType =
      // | 'action'
      // | 'attack'
      | 'damage'
      | 'dbfreceived'
      // | 'debuff'
      | 'defeat'
      | 'dmgreceived'
      | 'hitreceived'
      | 'special'

    export type EffectEnum =
      | 'buff'
      | 'boon'
      | 'cleanse'
      | 'damage'
      | 'debuff'
      | 'hinderance'
      | 'penalty'
      | 'recharge'

    export type TargetingPriority =
      | 'highest'
      | 'lowest'
      | 'above'
      | 'below'
      | 'exactly'

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
      gpStat?: GpStat
    }

    export type Ability = {
      effects: Effect[]
    }

    export type Condition = {
      comparator?: ConditionComparator
      count?: number
      families?: Family[]
      relative?: boolean
      stat?: Attribute
      team?: ConditionTeam
      type: ConditionType
    }

    export type GpBasicCondition = {
      type: GpConditionType
      count: number
    }

    export interface GpActionCondition extends GpBasicCondition {
      type: 'action'
      action: 'heal' | 'guard'
    }

    export interface GpAttackCondition extends GpBasicCondition {
      type: 'attack'
      attack: PatternType
    }

    export interface GpDebuffCondition extends GpBasicCondition {
      type: 'debuff'
      attribute: Attribute
    }

    export interface GpCommonCondition extends GpBasicCondition {
      type: GpConditionType
      team?: ConditionTeam
    }

    export type GpCondition =
      | GpAttackCondition
      | GpActionCondition
      | GpDebuffCondition
      | GpCommonCondition

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
      attribute?: ColorType | ClassKey | 'all'
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
      leader?: boolean
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
      type: 'fixed' | 'cut' | 'atk' | 'atkbase' | 'time'
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
      /**
       * Specify cost only if different from those default value:
       * - Legend: 55
       * - Kizuna, TM, PR: 35
       * - PR RR, < 4* without evolution: 20
       * - Others: 30
       */
      cost?: number
    }

    export type TargetClass = {
      comparator?: TargetingPriority
      criteria: Attribute
    }

    export type BurstSpecial = {
      uses: number
      effects: Effect[]
    }

    export type Burst = {
      condition: [GpCondition, ...GpCondition[]]
      special: [
        BurstSpecial,
        BurstSpecial,
        BurstSpecial,
        BurstSpecial,
        BurstSpecial,
      ]
    }

    export type GpStat = {
      burst: Burst
      ability: [Ability, Ability, Ability, Ability, Ability]
    }
  }
}
