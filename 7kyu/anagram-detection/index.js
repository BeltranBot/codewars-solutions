// http://www.codewars.com/kata/anagram-detection/
function isAnagram (test, original) {
    if (test.length != original.length) return false
    test = [...test.toLowerCase()].sort().join('')
    original = [...original.toLowerCase()].sort().join('')
    return test == original
}