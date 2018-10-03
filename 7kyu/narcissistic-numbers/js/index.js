// http://www.codewars.com/kata/narcissistic-numbers

function isNarcissistic (n) {  
    let exp = n.toString().length
    let x = [...n.toString()].map(x => +x).reduce((a, c) => a + (c ** exp), 0)
    return n === x
}

let n = 153
let ans = isNarcissistic(n)
console.log('ans', ans)