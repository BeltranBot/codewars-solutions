// http://www.codewars.com/kata/alphabet-symmetry/
const ALPHABET = [...'abcdefghijklmnopqrstuvwxyz']

function solve (arr) {
    return arr.map(x => x.toLowerCase()
        .split('')
        .reduce((a, c, i) => a + (c == ALPHABET[i] ? 1 : 0),
    0))
}

console.log(solve(['abc', 'ABODE']))