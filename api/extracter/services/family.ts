import { DBfamily } from './db-loader'

export function getFamilyId(unitId : number) {
  const family = DBfamily[unitId]

  if (!family) return -1

  if (Array.isArray(family)) {
    return DBfamily.findIndex(
      f => Array.isArray(f) && f.every(fam => family.includes(fam)),
    )
  }

  return DBfamily.findIndex(u => u === family) + 1
}
