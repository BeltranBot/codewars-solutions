// http://www.codewars.com/kata/josephus-permutation/

function josephus (items, k) {
    let ans = []
    let i = k
    
    while (items.length > 0) {
        let j = i % items.length
        j = j === 0 ? items.length - 1 : j - 1
        ans.push(items.splice(j, 1)[0])
        i = j + k
    }

    return ans
}

// let arr = [1, 2, 3, 4, 5, 6, 7]
// let n = 3

// let arr = [1,2,3,4,5,6,7,8,9,10]
// let n = 1

let arr = ["C","o","d","e","W","a","r","s"]
let n = 4

console.log(josephus(arr, n))