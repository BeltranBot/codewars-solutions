// http://www.codewars.com/kata/word-values
function wordValue (a) {
    let ans = []
    let i = 1
    for (let word of a) {
        word = word.replace(/\s/g, '')
        let n = [...word].reduce((a, c) => a + (c.charCodeAt(0) - 96), 0) * i
        ans.push(n)
        i++
    }
    return ans
}

let test = ["codewars", "abc", "xyz"]

console.log(wordValue(test))