// http://www.codewars.com/kata/form-the-minimum/

function minValue2 (values) {
    values.sort()
    
    let ans = []

    for (let i = 0; i < values.length; i++) {
        if (ans.length == 0) {
            ans.push(values[i])
            continue
        }
        if (values[i] == ans[ans.length - 1]) continue
        ans.push(values[i])
    }

    return +ans.join('')
}

function minValue (values) {
    return +Array.from(new Set(values)).sort().join('')
}

let x = [4, 7, 5, 7]

console.log(minValue(x))