// http://www.codewars.com/kata/champernownes-championship/

function champernowneDigit (a) {
    if (!Number.isInteger(a) || a <= 0) return NaN
    if (a <= 10) return a - 1

    let b = -1
    let c = 0
    let d = 0
    let e = 0
    let f = 1
    let g = 0

    do {
        g = f
        b++
        c++
        d = 10 ** b
        e = 10 ** c
        f += (e - d) * c
    } while (f <= a)

    if (a == g) return +d.toString()[0]

    let h = Math.ceil((a - g) / c) - 1
    let i = d + h
    let j = g + (h * c)
    let k = a - j - 1

    return +i.toString()[k]
}

// // let n = 3678608
let n = 190
let ans = champernowneDigit(n) // 0
console.log(ans)
// let ans2 = champernowneDigit(n) // 0
// console.log(
//     ans, ans2
// )
let counter = 0
for (let i = 1; i < 10000000; i++) {
    let a = champernowneDigit(i)
    // let b = +champernowneDigit2(i)
    // console.log(i, a, b)
    // if ( a != b) break
    if (isNaN(a)) {
        console.log(i, a)
        counter++
    }
}
console.log(counter)

// for (let i = 20; i < 101; i++) {
//     console.log(champernowneDigit(i))
// }