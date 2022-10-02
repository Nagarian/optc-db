import { RawDB } from './models/raw-db'

export const isDescriptiveSupport = (
  value: RawDB.Support,
): value is RawDB.DescriptiveSupport => typeof value.levels[0] === 'string'

export const isLBCaptainPath = (
  value: RawDB.LB.Path
): value is RawDB.LB.CaptainPath => 'captain' in value
