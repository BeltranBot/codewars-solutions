// https://www.codewars.com/kata/abbreviate-a-two-word-name/

function abbrevName(name) {
  return name.split(' ').map(x => x[0].toUpperCase()).join('.')
}

let ans = abbrevName("John Smith")

console.log(ans)


