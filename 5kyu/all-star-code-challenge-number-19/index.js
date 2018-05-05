// http://www.codewars.com/kata/all-star-code-challenge-number-19

function sloganMaker (a) {

    let permutations = getPermutations(a)
    let ans = []

    for (const permutation of permutations) {
        let line = []
        for (const word of permutation) {
            if (line.includes(word)) continue
            line.push(word)
        }
        line = line.join(' ')
        if (ans.includes(line)) continue
        ans.push(line)
    }
    return ans
}

function getPermutations (a) {
    let permutations = []

    permute([], a)    

    function permute (c = [], a) {
        if (a.length == 1) return a
        if (a.length == 2) {
            permutations.push(a)
            swap(a, 0, 1)
            permutations.push(a)
        } else if (a.length == 3) {
            for (let i = 0; i < a.length; i++) {
                for (let j = 0; j < a.length - 1; j++) {
                    swap(a, j, j + 1)
                    permutations.push(c.concat(a))
                }
            }
        } else {
            for (let i = 0; i < a.length; i++) {                
                let b = a.slice(0)
                let d = c.slice(0)
                swap(b, 0, i)
                d.push(b.shift())
                permute(d, b)
            }
        }
    }

    function swap(a, i, j) {
        [a[i], a[j]] = [a[j], a[i]]
    }

    return permutations
}
// heap's algorithm
function permute (a, n = a.length) {
    if (n <= 1) {
        console.log(a)
    } else {
        for (let i = 0; i < n; i++) {
            permute(a, n - 1)
            const j = n % 2 ? 0 : i;
            [a[n - 1], a[j]] = [a[j], a[n - 1]]
        }
    }
}