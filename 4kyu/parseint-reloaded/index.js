// https://www.codewars.com/kata/parseint-reloaded

function parseInt(string) {
    const VALUES = {
        'zero': 0,
        'one': 1,
        'two': 2,
        'three': 3,
        'four': 4,
        'five': 5,
        'six': 6,
        'seven': 7,
        'eight': 8,
        'nine': 9,
        'ten': 10,
        'eleven': 11,
        'twelve': 12,
        'thirteen': 13,
        'fourteen': 14,
        'fifteen': 15,
        'sixteen': 16,
        'seventeen': 17,
        'eighteen': 18,
        'nineteen': 19,
        'twenty': 20,
        'thirty': 30,
        'forty': 40,
        'fifty': 50,
        'sixty': 60,
        'seventy': 70,
        'eighty': 80,
        'ninety': 90,
        'hundred': 100,
        'thousand': 1000,
        'million': 1000000
    }

    let arr = string.split(' ')
    let ans = 0

    let prev = 0
    let prev_value = 'million'

    while (arr.length) {

        let item = arr.shift()
        if (item === 'and') continue

        if (VALUES[item] !== undefined) {
            if (['hundred', 'thousand', 'million'].includes(item)) {
                if (VALUES[prev_value] < VALUES[item]) {
                    ans = (ans + prev) * VALUES[item]
                } else {
                    if (!prev) {
                        prev = ans
                        ans = 0
                    }
                    ans += prev * VALUES[item]
                }
                prev = 0
                prev_value = item
            } else {
                prev += VALUES[item]
            }
        } else {
            prev = ans + item.split('-').reduce((a, c) => a + VALUES[c], 0)
            ans = 0
        }
    }

    return ans + prev
}

// let ans = parseInt('zero')
// let ans = parseInt('seven hundred eighty-three thousand nine hundred and nineteen')
// let ans = parseInt('one thousand three hundred and thirty-seven')
// let ans = parseInt('seven hundred thousand')
let ans = parseInt('two hundred three thousand')
console.log('answer:', ans);
