// https://www.codewars.com/kata/factorial-decomposition

function isPrime (n) {
    if (n == 1) return false
    if (n == 2) return true
    if (n % 2 == 0) return false
    for (let i = n - 1; i > 1; i--) {
        if (n % i == 0) return false
    }
    return true
}

function calculatePrimes (n) {
    let primes = []
    for (let i = 2; i <= n; i++) {
        if (isPrime(i)) primes.push(i)
    }
    return primes
}

function getExponents (n, x) {
    if (n == 0) return 0
    let c = 0
    while ((n % x) == 0) {
        c++
        n /= x
    }
    return c
}

function formatAnswer (obj) {
    let ans = []
    Object.keys(obj).map(function (key) {
        let b = +key
        let e = obj[key]

        if (e == 1) {
            ans.push(b)
        } else {
            ans.push(b + '^' + e)
        }
    })
    return ans.join(' * ')
}

function decomp (n) {
    let f = n
    let primes = calculatePrimes(f)
    let prime_factors = {}

    for (let j = 2; j <= f; j++) {
        for (let i = 0; i < primes.length; i++) {
            if ((exponent = getExponents(j, primes[i])) > 0) {
                if (!prime_factors[primes[i]]) prime_factors[primes[i]] = 0
                prime_factors[primes[i]] += exponent
            }           
        }
    }

    return formatAnswer(prime_factors)
}

console.log(decomp(4000))