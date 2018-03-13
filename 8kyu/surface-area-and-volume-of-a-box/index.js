// http://www.codewars.com/kata/surface-area-and-volume-of-a-box
function getSize(w, h, d) {
    let s = 2 * ((w * h) + (h * d) + (w * d))
    let v = w * h * d
    return [s, v]
}

// let ans = getSize(10, 10 ,10)
let ans = getSize(4, 2, 6)
console.log(ans)