import {
  CharacterClasses,
  CharacterTypes,
  Potentials,
  Rarities,
  RumbleStyles,
} from './constants'
import { Flags, LBPathTypes, SupportTypes } from './raw-constant'

export declare namespace RawDB {
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

  namespace LB {
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

    export type LimitBreak = {
      path: Path[]
      potentials: Potential[]
    }
  }

  // export type PFAbility = {
  //   description: string
  // }

  // export type PFSpecial = {
  //   description: string
  //   cooldown: number
  // }

  // export type PFBehavior = {
  //   description: string
  // }

  // export type PFStat = {
  //   DEF: number
  //   SPD: number
  // }

  // export type PirateFest = {
  //   class: PirateFestStyle
  //   ability: PFAbility[]
  //   special: PFSpecial[]
  //   behaviorPattern: PFBehavior[]
  //   targetPriority: string
  //   resistance?: string
  //   stats: PFStat
  // }

  export type AffiliatedLinks = {
    gamewithId?: number
    officialJapan?: string
  }

  export type DualUnitDetail = {
    name: string
    japanName?: string
    frenchName?: string
    type: Type
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
    type: Type
    class: Class
    stats: Statistics
    captain?: Captain
    special?: Special
    sailor?: Sailor[]
    // pirateFest?: PirateFest
    versus: Versus
  }

  export type VersusUnitNode = {
    character1: VersusUnitDetail
    character2: VersusUnitDetail
    criteria: string
  }

  type BaseCharacter = {
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
    captain?: Captain
    superType?: SuperType
    special?: Special
    sailor?: Sailor[]
    support?: Support
    // pirateFest?: PirateFest
  }

  export type DualCharacter = BaseCharacter & {
    captain?: Captain
    special?: Special
    sailor?: Sailor[]
    // pirateFest?: PirateFest
    characters: DualUnitNode
  }

  export type VersusCaptain = {
    name: string
  }

  export type VersusCharacter = BaseCharacter & {
    captain: VersusCaptain
    // pirateFest?: PirateFest
    characters: VersusUnitNode
  }

  export type Character = SingleCharacter | DualCharacter | VersusCharacter

  export type DBCharacter = [number, RawDB.Character]
}
