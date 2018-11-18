// https://www.codewars.com/kata/rot13/

function rot13 (str) {
  const LOWER_A = 'a'.charCodeAt(0)
  const LOWER_Z = 'z'.charCodeAt(0)

  function rot13Char(letter) {
    let letter_n = letter.toLowerCase().charCodeAt(0)
    let letter_og = letter.charCodeAt(0)

    if (letter_n >= LOWER_A && letter_n <= LOWER_Z) {
      return (letter_n < LOWER_A + 13) ?
        String.fromCharCode(letter_og + 13) :
        String.fromCharCode(letter_og - 13)
    }

    return letter
  }

  let ans = ''

  for (const letter of str) {
    ans += rot13Char(letter)
  }

  return ans
}

let test = 'EBG13 rknzcyr.'
let ans = rot13(test)
console.log('ans', ans)
