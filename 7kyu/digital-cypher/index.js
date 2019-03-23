// https://www.codewars.com/kata/digital-cypher/

function encode(str, n) {
  let letter_a = 'a'.charCodeAt(0) - 1
  let n_arr = [...`${n}`].map(x => +x)
  return [...str].map((x, i) => x.charCodeAt(0) - letter_a + n_arr[i % n_arr.length])
}

let message = 'scout'
let key = 1939

let ans = encode(message, key)

console.log(ans)