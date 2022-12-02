const
    legend = 294300,
    RR = 147150,
    RRR = 97300,
    FN = 73575,
    GP = 304100

function compute(score) {
    const bronze = 450
    const silver = 1500
    const gold = 9000

    function* range(total, value) {
        const max = Math.round(total / value)
        for (let index = 0; index < max; index++) {
            yield index + 1
        }
    }

    let optimum = [-Infinity, bronze, silver]

    const perfects = []

    for (const b of range(score, bronze)) {
        const sub = score - (b * bronze)

        for (const s of range(score, silver)) {
            const final = sub - (s * silver)

            if (final === 0) {
                perfects.push([b, s])
            }

            if (final <= 0 && final > optimum[0]) {
                optimum = [final, b, s]
            }
        }
    }

    return {
        optimum: {
            remaining: optimum[0],
            bronze: optimum[1],
            silver: optimum[2],
            altGold: Math.trunc((optimum[2] * silver) / gold),
            altSilver: ((optimum[2] * silver) % gold) / silver,
        },
        perfects: perfects.map(([pb, ps]) => ({
            bronze: pb,
            silver: ps,
            altGold: Math.trunc((ps * silver) / gold),
            altSilver: ((ps * silver) % gold) / silver,
        })),
    }
}

console.log('legend', compute(legend))
console.log('RR', compute(RR))
console.log('RRR', compute(RRR))
console.log('FN', compute(FN))
console.log('GP', compute(GP))
console.log('legend + GP', compute(legend + GP))
