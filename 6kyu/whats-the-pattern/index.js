// http://www.codewars.com/kata/whats-the-pattern

function findPattern (arr) {
    let ans = []

    outside_for:
    for (let i = 0; i < arr.length - 1; i++) {
        ans.push(arr[i + 1] - arr[i])

        for (let j = 0; j < arr.length - 1; j++) {
            let x = arr[j + 1] - arr[j]
            if (x != ans[j % ans.length]) break
            if (j == arr.length - 2) {
                let a = arr[arr.length - 1] - arr[arr.length - 2]
                let b = arr[arr.length - 2] - arr[arr.length - 3]
                if (a != b && a != ans[ans.length - 1]) ans.push(a)
                break outside_for
            }
        }
    }

    return ans
}

function findPattern2 (arr) {
    let diffs = arr.slice(1).map((n, i) => n - arr[i])
    let str = diffs.join(',') + ','

    return str.match(/^(.+?,)\1*$/)[1]
        .slice(0, -1)
        .split(',')
        .map(Number)
}


let sequence = [-67,
    -66,
    -64,
    -61,
    -57,
    -52,
    -46,
    -39,
    -31,
    -22,
    -12,
    -2,
    7,
    15,
    22,
    28,
    33,
    37,
    40,
    42,
    43
]

let sequence2 = [1, 5, 4, 8, 7, 11, 10, 14, 13]

console.log(findPattern2(sequence))