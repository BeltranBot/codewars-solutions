// https://www.codewars.com/kata/format-words-into-a-sentence

function formatWords (words) {
  if (!words || !words.length) return ''

  words = words.filter(x => x.length)

  if (!words || !words.length) return ''
  if (words.length === 1) return words[0]

  words = words.join(', ')

  let lastIndex = words.lastIndexOf(', ')

  return words.substring(0, lastIndex) + ' and ' + words.substring(lastIndex + 2, words.length)
}

// let words = ['ninja', 'samurai', 'ronin']
// let words = ['', '', 'three']
let words = ['']

let ans = formatWords(words)

console.log('ans', ans)