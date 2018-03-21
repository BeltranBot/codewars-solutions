// http://www.codewars.com/kata/kebabize
const LOWER_A = 'a'.charCodeAt(0)
const LOWER_Z = 'z'.charCodeAt(0)
const UPPER_A = 'A'.charCodeAt(0)
const UPPER_Z = 'Z'.charCodeAt(0)

function kebabize_old (str) {
    let ans = ''
    for (const letter of str) {
        let n = letter.charCodeAt(0)
        if (n >= LOWER_A && n <= LOWER_Z) {
            ans += letter
        }else if (n >= UPPER_A && n <= UPPER_Z) {
            if (ans.length == 0 || n[n.length - 1] == '-') {
                ans += letter.toLowerCase()
            } else {
                ans += '-' + letter.toLowerCase()
            }
        }
    }

    return ans
}

function kebabize (str) {
    return str.replace(/[^a-z]/, '')
            .replace(/^[A-Z]/, c => c.toLowerCase())
            .replace(/[A-Z]/, c => '-' + c.toLowerCase())
}

// console.log(kebabize('myCamelCasedString'))
// console.log(kebabize('myCamelHas3Humps'))
console.log(kebabize('3JkJz08mldgbxk73nmi'), 'jk-jzmldgbxknmi')

