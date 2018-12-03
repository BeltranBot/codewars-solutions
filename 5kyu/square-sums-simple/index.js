// https://www.codewars.com/kata/square-sums-simple
function buildMatrix(n) {

  let matrix = []
  for (let i = 0; i < n; i++) {
    let row = []
    for (let j = 0; j < n; j++) {
      if (i === j) {
        row.push(0)
        continue
      }

      let val = i + j + 2
      row.push(SQUARES.includes(val) ? 1 : 0)
    }
    matrix.push(row)
  }

  return matrix
}

function clearColumn(matrix, k) {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (k.includes(col)) {
        matrix[row][col] = 0
      }
    }
  }
  return matrix
}

function getPaths(row) {
  let paths = []
  for (let i = 0; i < row.length; i++) {
    if (row[i] === 1) paths.push(i)
  }

  return paths
}

function cloneMatrix(matrix) {
  let new_matrix = []
  for (let row = 0; row < matrix.length; row++) {
    let new_row = []
    for (let col = 0; col < matrix[row].length; col++) {
      new_row.push(matrix[row][col])
    }
    new_matrix.push(new_row)
  }
  return new_matrix
}

// function square_sums_row(n) {
//   let matrix = buildMatrix(n)

//   let memo = new Set

//   for (let row = 0; row < matrix.length; row++) {
//     let paths = getPaths(matrix[row])

//     for (let col of paths) {
//       let temp_matrix = cloneMatrix(matrix)

//       clearColumn(temp_matrix, [row, col])

//       if (found_path = findPath(temp_matrix, [row, col])) {
//         return found_path.map(x => x + 1)
//       }
//     }
//   }

//   function findPath(matrix, path) {
//     if (path.length === n) return path
//     if (memo.has(path.toString())) {
//       return false
//     }
//     let row = path[path.length - 1]
//     let paths = getPaths(matrix[row])
//     if (!paths.length) return false

//     for (const col of paths) {
//       let temp_matrix = cloneMatrix(matrix)
//       let temp_path = [...path, col]
//       temp_matrix[row][col] = 0
//       clearColumn(temp_matrix, [col])
//       if (found_path = findPath(temp_matrix, temp_path)) {
//         return found_path
//       }
//     }
//     memo.add(path.toString())
//     return false
//   }
//   return false
// }

// const SQUARES = [...Array(15)].map((x, i) => (i + 1) * (i + 1))
// let n = 43
// console.time('squaresumrow')
// let ans = square_sums_row(n)
// console.timeEnd('squaresumrow')
// console.log('ans', ans)

function choose_one(so_far, nums, squares) {
  if (nums.length === 0) {
    return so_far
  } else {
    for (let n of nums) {
      if (so_far.length === 0 || squares.has(so_far[so_far.length - 1] + n)) {
        n2 = [...nums]
        let index = n2.indexOf(n)
        n2.splice(index, 1)
        let ans = choose_one(so_far.concat(n), n2, squares)
        if (ans) {
          return ans
        }
      }
    }
  }
  return false
}

function square_sums_row(rmax = 44) {
  let [squares, i] = [new Set, 1]

  while (i * i < rmax ** 2) {
    squares.add(i * i)
    i += 1
  }
  let nums = [...Array(rmax)].map((x, i) => i + 1)

  return choose_one([], nums, squares)
}

let ans = square_sums_row(43)
console.log(ans)