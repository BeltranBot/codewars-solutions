// http://www.codewars.com/kata/bankers-plan/

function fortune (f0, p, c0, n, i) {
    p /= 100
    i /= 100
    for (let j = 0; j < n - 1; j++) {
        f0 += Math.floor(f0 * p)
        f0 -= c0
        if (f0 < 0) return false
        c0 += Math.floor(c0 * i)
    }
    return f0 > 0
}

// console.log(fortune(8077363,7,538696,17,3))
console.log(fortune(11278378,4,752830,18,2))