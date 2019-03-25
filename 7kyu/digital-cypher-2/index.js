// https://www.codewars.com/kata/digital-cypher-vol-2/

function decode (code, n) {
  let letter_a = 'a'.charCodeAt(0) - 1
  let str_n = `${n}`
  return code.map((x, i) =>
    String.fromCharCode((x - str_n[i % str_n.length]) + letter_a)
  ).join('')
}

let code = [14, 10, 22, 29, 6, 27, 19, 18, 6, 12, 8]
let key = 1939

let ans = decode(code, key)

console.log(ans)