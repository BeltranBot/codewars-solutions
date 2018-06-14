// https://www.codewars.com/kata/compare-powers
function comparePowers(n1, n2) {
    let a = n1[1] * Math.log(n1[0])
    let b = n2[1] * Math.log(n2[0])
    
    return (a > b) ? -1 : (a < b) ? 1 : 0    
}