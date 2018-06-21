// https://www.codewars.com/kata/adding-arrays
function arrAdder(arr) {
    let ans = []
    arr[0].forEach(el => {
        ans.push([])
    })
    
    arr.forEach((el, i) => {
        for (let i = 0; i < el.length; i++) {
            ans[i].push(el[i])
        }
    })
    
    return ans.map(el => el.join(''))
        .join(' ')
        .trim()
}