import { RawDB } from '../../raw-db/models/raw-db'
import { familiesKey } from '../../raw-to-final/enhancer/family'
import { OldDB } from '../models/old-db'

export function extractFamily(unit: OldDB.ExtendedUnit): RawDB.Family[] {
  const [f] =
    Object.entries(FixupFamily).find(([f, ids]) => ids?.includes(unit.id)) ?? []

  if (f) return [f as RawDB.Family]

  if (!unit.families) return []

  return Object.entries(familiesKey)
    .filter(([_, entries]) => entries.every(s => unit.families?.includes(s)))
    .map(([key]) => key as RawDB.Family)
}

const FixupFamily: Partial<Record<RawDB.Family, number[]>> = {
  SenorPink: [873, 874, 1261, 1262, 1903, 1904, 1942, 1943, 2002],
  CharlotteBrulee: [2114, 2115, 2127, 2800, 2858],
  Penguin: [78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 266],
  Crab: [
    89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 1180, 300, 301, 302, 303, 304,
    2662,
  ],
  StripedDragon: [100, 101, 102, 103, 104, 267],
  Turtle: [
    105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 189, 190, 191, 192, 193,
    591, 592, 593, 594, 595,
  ],
  SeaHorse: [115, 116, 117, 118],
  JeweledPorc: [342, 343, 344, 345, 346, 347, 348, 349, 350, 351],
}
