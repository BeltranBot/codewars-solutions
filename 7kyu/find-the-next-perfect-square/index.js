// http://www.codewars.com/kata/find-the-next-perfect-square

function findNextSquare (n) {
    let a = Math.sqrt(n)
    if (!Number.isInteger(a)) return -1
    return (a + 1) * (a + 1)
}

let n = -4
console.log(findNextSquare(n))