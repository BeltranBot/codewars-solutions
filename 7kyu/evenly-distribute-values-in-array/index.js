// http://www.codewars.com/kata/evenly-distribute-values-in-array/
const distributeEvenly = (array) => {
  let data = {}
  
  for(let item of array) {
    if (data[item]) {
      data[item].push(item)
    } else {
      data[item] = [item]
    }
  }
  
  let ans = []

  while (Object.keys(data).length > 0) {
    for (const key in data) {
      if (data[key].length === 0) {
        delete data[key]
      } else {
        ans.push(data[key].pop())
      }
    }
  }
  
  return ans
}

let arr = ['one', 'one', 'two', 'two', 'three', 'three', 'four', 'one']
let ans = distributeEvenly(arr)

console.log(arr)