// https://www.codewars.com/kata/scramblies/

function scramble(str1, str2) {


    function getHashObj(str) {
        let obj = {}

        for (let i of [...str]) {
            if (obj[i]) {
                obj[i]++
            } else {
                obj[i] = 1
            }
        }

        return obj
    }

    let obj1 = getHashObj(str1)
    let obj2 = getHashObj(str2)


    for (let i of Object.keys(obj2)) {

        if (obj1[i] >= obj2[i]) continue
        return false
    }

    return true

}

// let ans = scramble('katas', 'steak')
let ans = scramble('cedewaraaossoqqyt', 'codewars')

console.log('the answer is:', ans);
