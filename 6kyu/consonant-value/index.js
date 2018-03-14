// http://www.codewars.com/kata/consonant-value
const VOWELS = [...'aeiou']

function solve (s) {
    let max = 0
    let consonats = ''
    for (const letter of s) {
        if (VOWELS.indexOf(letter) != -1) {
            if (consonats.length > 0) {
                max = getMax(max, getValue(consonats))
                consonats = ''
            } else {
                continue
            }
        } else {
            consonats += letter
        }
    }
    if (consonats.length > 0) {
        max = getMax(max, getValue(consonats))
    }
    return max
}

function getMax(c, v) {
    return v > c ? v : c
}

function getValue(consonats) {
    let v = 0
    for (const letter of consonats) {
        v += letter.charCodeAt(0) - 96
    }
    return v
}

// let ans = solve('zodiacs')
// let ans = solve("mischtschenkoana")
// let ans = solve('chruschtschov')
let ans = solve('catchphrase')
console.log(ans)

// const solve = s => s.split(/[aeiou]+/).reduce((s,n)=> Math.max(s, n.split('').reduce((a,b)=> a + b.charCodeAt(0)-96,0 )), 0);