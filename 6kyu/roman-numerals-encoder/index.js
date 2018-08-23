// http://www.codewars.com/kata/roman-numerals-encoder
const ROMAN_NUMERALS = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1
}

function solution (number) {
    let s = ''

    Object.keys(ROMAN_NUMERALS).forEach(key => {        
        while (number >= ROMAN_NUMERALS[key]) {
            s += key
            number -= ROMAN_NUMERALS[key]
        }
    })

    return s
}