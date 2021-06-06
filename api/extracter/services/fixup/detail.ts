import { OldDB } from '../../models/old-db'

export function fixupDetail(unit: OldDB.ExtendedUnit): OldDB.ExtendedUnit {
  if (unit.detail.potential?.length) {
    const renamedPotentials: Record<string, OldDB.PotentialKey> = {
      Enrage: 'Enrage/Reduce Increase Damage Taken duration',
    }

    if (unit.detail.potential.some(p => !!renamedPotentials[p.Name])) {
      unit.detail.potential = unit.detail.potential.map<OldDB.UnitPotential>(
        p => ({
          ...p,
          Name: renamedPotentials[p.Name] ?? p.Name,
        }),
      )
    }
  }

  return unit
}
