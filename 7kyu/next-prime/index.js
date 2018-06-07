// http://www.codewars.com/kata/next-prime/
function isPrime (n) {
    if (n <= 1) return false
    if (n === 2) return true
    if ((n % 2) === 0) return false

    for (let i = Math.floor(Math.sqrt(n)); i >= 3; i--) {
        if ((n % i) == 0) return false
    }

    return true
}

function nextPrime (n) {
    let i = n + 1
    while (!isPrime(i)) {
        i++
    }

    return i
}

let n = 31

console.log(nextPrime(n))