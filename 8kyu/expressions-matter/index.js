function expressionMatter (a, b, c) {
    let ans = []
    ans.push(a + b + c)
    ans.push((a * b) + c)
    ans.push(a + (b * c))
    ans.push(a * b * c)
    ans.push((a + b) * c)
    ans.push(a * (b + c))
    return ans.sort((x, y) => y - x)[0]
}