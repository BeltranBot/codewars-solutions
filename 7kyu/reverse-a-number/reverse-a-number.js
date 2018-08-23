//http://www.codewars.com/kata/reverse-a-number
function reverseNumber(n) {
    let sign = n < 0
    n = (n + '').split('').reverse()
    if (sign) n.pop()
    return +((sign ? '-' : '') + n.join(''))
}