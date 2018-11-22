// https://www.codewars.com/kata/find-the-unique-number-1/

function findUniq (arr) {
    let obj = {}
    for (let num of arr) {
        if (obj[num]) {
            obj[num]++
        } else {
            obj[num] = 1
        }
    }

    for (let key of obj) {
        if (obj[key] == 1) {
            return key
        }
    }

    return null
}