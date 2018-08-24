// http://www.codewars.com/kata/ninety-nine-thousand-nine-hundred-ninety-nine

const DIGITS = {
    0: 'zero',
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine',
    10: 'ten',
    11: 'eleven',
    12: 'twelve',
    13: 'thirteen',
    14: 'fourteen',
    15: 'fifteen',
    16: 'sixteen',
    17: 'seventeen',
    18: 'eighteen',
    19: 'nineteen',
}

const TENS = {
    2: 'twenty',
    3: 'thirty',
    4: 'forty',
    5: 'fifty',
    6: 'sixty',
    7: 'seventy',
    8: 'eighty',
    9: 'ninety'
}

const HUNDREDS = {
    3: 'hundred',
    4: 'thousand'
}

function numberToEnglish (number) {
    if (!Number.isInteger(number)) return ''
    if (number < 0) return ''

    let n = [...number.toString()]
    let english = []

    if (n.length == 5) {
        if (n[0] == '1') {
            english.push(DIGITS[n.shift() + n.shift()])
            english.push(HUNDREDS[4])
        } else {
            english.push(TENS[n.shift()])
        }
    }

    if (n.length == 4) {
        if (n[0] == '0') {
            n.shift()
            english.push(HUNDREDS[4])
        } else {
            english.push(DIGITS[n.shift()])
            english.push(HUNDREDS[4])
            if (n[0] == '0') {
                n.shift()
            }
        }
    }

    if (n.length == 3) {
        if (n[0] == '0') {
            n.shift()
        } else {
            english.push(DIGITS[n.shift()])
            english.push(HUNDREDS[3])
        }        
    }

    if (n.length == 2) {
        if (n[0] == '1') {
            english.push(DIGITS[n.shift() + n.shift()])
        } else {
            if (n[0] == '0') {
                n.shift()
            } else {
                english.push(TENS[n.shift()])
            }
        }
    }

    if (n.length == 1) {
        if (n[0] == '0') {
            if (english.length == 0) {
                english.push(DIGITS[n.shift()])
            }
        } else {
            english.push(DIGITS[n.shift()])
        }
    }

    console.log(english)

    return english.join(' ')
}

console.log(numberToEnglish(100))