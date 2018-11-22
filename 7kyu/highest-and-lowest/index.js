// https://www.codewars.com/kata/highest-and-lowest/train/javascript

function highAndLow (numbers){
    numbers = numbers.split(' ').map(x => +x)
    let highest = numbers.reduce((a, c) => a > c ? a : c, -Infinity)
    let lowest = numbers.reduce((a, c) => a < c ? a : c, Infinity)

    return `${highest} ${lowest}`
}