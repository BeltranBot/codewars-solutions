// http://www.codewars.com/kata/simple-parenthesis-removal

function solve (s) {
    s = [...s]
    let ans = []
    let negative = false

    for (let i = 0; i < s.length ; i++) {
        let prev = (ans.length == 0) ? false : ans[ans.length - 1]
        let curr = s[i]
        let next = s[i + 1]

        switch (curr) {
            case '(':
                break
            case ')':
                negative = false
                break
            case '-':
                if (negative && prev) {
                    if (prev == '-') ans.pop()
                    else if (prev == '+') {
                        ans.pop()
                        ans.push('-')
                        continue
                    }
                    ans.push('+')
                    negative = next != '('
                } else {
                    negative = next == '('
                    if (prev == '+') ans.pop()
                    ans.push('-')
                }
                break
            case '+':
                if (negative && prev) {
                    if (prev == '-' || prev == '+') continue
                    ans.push('-')
                } else ans.push(curr)
                break
            default:
                ans.push(curr)
                break
        }
    }

    return ans.join('').replace(/^\+*/, '')
}

// let str = 'v-(l+s)-(t+y)-(c+f)+(b-(n-p))'
// v-l-s-t-y-c-f+b-n+p
// let str = '(((((((((-((-(((n))))))))))))))'
// let str = 'a-(-b)'
// let str = 'a+(-b)'
let str = '((((-(-(-(-(m-g))))))))'
console.log(solve(str))