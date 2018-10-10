// http://www.codewars.com/kata/convert-string-to-camel-case/

function toCamelCase (str) {
  if (str.length === 0) return ''
  let first_letter = str[0]
  str.toLowerCase()

  // str = str.replace(/((?:-|\_)\w)/g, x => x.toUpperCase())
  str = str.replace(/((-|_)\w)/g, x => x[1].toUpperCase())
  str[0] = first_letter

  return str
}

let test = 'hello-world-hi'
// let test = 'the-stealth-warrior'

let ans = toCamelCase(test)

console.log(ans)