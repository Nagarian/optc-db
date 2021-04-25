import { OldDB } from '../../models/old-db'
import { RawDB } from '../../models/raw-db'

export function extractLinks(unit: OldDB.ExtendedUnit): RawDB.AffiliatedLinks {
  return {
    gamewithId: unit.gamewith,
    officialJapan: extractOfficialJapan(unit)
  }
}


function extractOfficialJapan(unit: OldDB.ExtendedUnit): string | undefined  {
    if (unit.id === 1478) {
        return '/カリブー-カリブー海賊団船長/'
    }

    if (unit.id === 1892) {
        return '/ジュラキュール・ミホーク-シッケアール王国　跡/'
    }

    if ([ 2049, 2050, 2072, 2079, 2080, 2081, 2082, 2083, 2084, 2085, 2086, 2087, 2088, 2089, 2090, 2091, 2097, 2104, 2105, 2106, 2107, 2108, 2109, 2110, 2111, 2114, 2116, 2119, 2120, 2121, 2146, 2162, 2163, 2168, 2169, 2170, 2171, 2172, 2173, 2175, 2180, 2181, 2182, 2183, 2184, 2185, 2186, 2187, 2188, 2189, 2190, 2191, 2192, 2193, 2212, 2213, 2214, 2215, 2216, 2216, 2218, 2219, 2240, 2241, 2242, 2243, 2244, 2248, 2249, 2255 ].includes(unit.id)){
        return `/c%E2%80%90${unit.id}/`
    }
    
    if ([ 2176, 2177, 2178, 2179 ].includes(unit.id)){
        return `/%EF%BD%83%E2%80%90${unit.id}/`
    }

    return undefined
}