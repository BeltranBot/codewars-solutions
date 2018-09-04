// http://www.codewars.com/kata/the-hashtag-generator

function generateHashtag (str) {
    str = str.trim()
    if (str.length == 0) return false

    let words = str.split(/\s+/g)

    for (let i = 0; i < words.length; i++) {
        let word = words[i]
        words[i] = word[0].toUpperCase() + word.substring(1, word.length)
    }

    let hashtag = words.join('') 

    return hashtag.length < 140 ? '#' + hashtag : false
}

// let test = ' Hello  there thanks for trying my Kata'
let test = "code" + " ".repeat(140) + "wars"
let ans = generateHashtag(test)
console.log(ans)