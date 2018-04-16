// http://www.codewars.com/kata/prime-streaming-pg-13

let LIMIT = 15486041

function sievePrimes (n = LIMIT) {
    let numbers = [...Array(n + 1).keys()]
    numbers[1] = 0
    let thres = Math.floor(Math.sqrt(n)) + 1

    for (let i = 2; i < thres; i++) {
        if (numbers[i] == 0) continue
        for (let j = i * 2; j < numbers.length; j += i) {
            if (numbers[j] != 0) numbers[j] = 0
        }            
    }
    return numbers.filter(x => x != 0)
}

let PRIMES = sievePrimes(LIMIT)

class Primes {

    static * stream () {
        for (let p of PRIMES) {
            yield p
        }
    }
}

class Primes2 {

    static * stream () {
        let n = 2
        yield n
        n++
        yield n
        
        while (true) {
            while (!this.isPrime(++n));
            yield n
        }
    }
    
    static isPrime (n) {
        if (n == 1) return false
        if (n == 2) return true
        if (n % 2 == 0) return false
        for (let i = 3; i <= Math.floor(Math.sqrt(n)); i += 2) {
            if (n % i == 0) return false
        }
        return true
    }

}

const stream = Primes.stream()

for (let i = 0; i < 10; i++) {
    console.log(i, stream.next())
}
console.log('finished')