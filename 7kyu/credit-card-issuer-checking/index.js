// http://www.codewars.com/kata/credit-card-issuer-checking
function getIssuer(number) {
    let n = number + ''
    if (inArray(+n.substring(0, 2), [34, 37]) && n.length == 15) {
        return 'AMEX'
    }
    if (inArray(+n.substring(0, 4), [6011]) && n.length == 16) {
        return 'Discover'
    }
    if (inArray(+n.substring(0 ,2), [51, 52 , 53, 54, 55]) && n.length == 16) {
        return 'Mastercard'
    }
    if (inArray(+n.substring(0 ,1), [4]) && inArray(n.length, [13, 16])) {
        return 'VISA'
    }
    return 'Unknown'
}

function inArray (needle, stack) {
    for (const n of stack) {
        if (needle == n) return true
    }
    return false    
}

let ans = getIssuer(9111111111111111)
console.log(ans)