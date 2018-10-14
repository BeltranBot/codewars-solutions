// https://www.codewars.com/kata/path-finder-number-1-can-you-reach-the-exit

// recursive
function pathFinder(maze) {
  let grid = maze.split('\n').map(line => line.trim().split(''))

  let neighbors = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ]

  const [GOAL_ROW, GOAL_COL] = [grid.length - 1, grid[0].length - 1]

  function searchGoal(grid, current_pos = [0, 0]) {
    let [cur_row, cur_col] = current_pos

    if (cur_row === GOAL_ROW && cur_col === GOAL_COL) return true    
    if (grid[cur_row][cur_col] === 'W' || grid[cur_row][cur_col] === 'X') {
      return false
    }

    grid[cur_row][cur_col] = 'X'

    for (let [n_row, n_col] of neighbors) {
      let next_row = cur_row + n_row
      let next_col = cur_col + n_col

      if (grid[next_row] && grid[next_row][next_col]) {
        if (searchGoal(grid, [next_row, next_col])) return true
      }
    } // end-foreach

    return false
  } // end-searchGoal

  return searchGoal(grid)
} // end-pathFinder

// iterative
function pathFinder2 (maze) {

  function arrIncludes (stack, needle) {
    let [x, y] = needle
  
    for (let [ix, iy] of stack) {
      if (x === ix && y === iy) {
        return true
      }
    }
  
    return false
  }

  let grid = maze.split('\n').map(line => line.trim().split(''))

  let neighbors = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ]

  const [GOAL_ROW, GOAL_COL] = [grid.length - 1, grid[0].length - 1]

  let node_stack = [[0, 0]]

  while (node_stack.length > 0) {
    let [cur_row, cur_col] = node_stack.shift()

    if (cur_row === GOAL_ROW && cur_col === GOAL_COL) {
      return true
    }

    grid[cur_row][cur_col] = ''

    for (let [n_col, n_row] of neighbors) {
      let next_row = cur_row + n_row
      let next_col = cur_col + n_col

      if (grid[next_row] && grid[next_row][next_col]
        && !['W', ''].includes(grid[next_row][next_col])
        && !arrIncludes(node_stack, [next_row, next_col])) {
          node_stack.push([next_row, next_col])
      }
    }
  }

  return false
}

let test1 = (
  `.W...
  .W...
  .W.W.
  ...W.
  ...W.`
)

let test2 = (
    `....W.W..W.......W...WW...WW.W......W.....W...WW..W..W.........W.WW....
    W..W.W..W.W..W.W....W..WWW......W..W..W.......W...........WW...W.W...W.
    W....W.WW...WW.WW.W...W..WW..W.........W.W...WW.....W.W...W.W.....WWW..
    ....W.W.......W.WW.W....WW.W........W..W......W...WW..WW.W...W.W.W.....
    W.......WW....W.WW........WW.......WW.W.W..W.......WW........W.....WW..
    WW........W..W.......W.WW.......W..W.............WW......W..W..........
    .W.W.W..W.WWW.W.WWW..W.W.W.W..W......W..........WW.W....W.W.....W..W...
    .....WW..W..WWW.W.WW..W....W....W.........W......W..WW.......WW.W......
    ..W...W...........WW..W.W.WW.W.....W..W.W.WW.W.W....W..WW..W.W.........
    ...WW.W.............W.W.W....W....W..W.W..W..W...W..W........W...WWW..W
    ....WWW.W..W....W......W........W..W..W...W.....W...W..WW......W.....W.
    W.W...W..W....W....W....WW......WWWWWWW.....WW....W...W..W...WWW.W.WW..
    ..W..WW...WW.W...WWWW.W.....W.W........W...........W....WWWWW..WW..WW..
    WW..W.......W....WW.W......W....W.W......WW..W.WW...WW....W.WW.W.W..W..
    ...W.WW.......W...WW.W.W.W...W...WWWW..W..W..WW......W..W....W..W...W..
    W....WW.W.W..W.W..W...W.W......W.WW.W.W...........W..WWW.....W....WW...
    ..W......WW......W.........W.W.......W...WWW..WW.WW.W.W........WW...WW.
    ...WW.......W..W.....W..........WW...WW...W......W.W...W...W..W...W....
    .......W..W.................W...W...WW......W...W..W....W.WW..W..WW.WWW
    W..W.W.WW.....W....W.....WW..W.....WWW......WWWW..W.WWW.....W.........W
    W.............W..W....W.........WWWWW...WWW.WW.WW......W....W..WWW.....
    ...W....WW...WW....WW.WW....W.W.W.W..W.W..WWW..........W.WWW.WW.W.WWWW.
    W.W.....W...W...........W.W.W..WWWWW.WW.W........WWW...W.......W....W..
    .......W..WW...W....W.....W.WWW..W..W.W.W....W....WWWW..W..W..WWWW....W
    .W..WW.....W..W....WW..W.W.WW........WW......WW...W......WW.W........W.
    .W.WW..WW..W...........W....W..W...WW.....WW..WW.W.W......W....WW.W....
    .W.W..........W..W...........W.......W..WW..W.WW.......W......W..W..W.W
    ..W.WW..W.....W..WW.....WW.WWW.W.W..........WWWW.......WWWW.....WW..W..
    .W..W...WWW.WWWW.WW...W...WW.W....W.....W..........W..WW.W...W..W....W.
    W...W...WW.........W..W..W....W.....W....W.WW..W..WW.W.......W.W.......
    .......WW.W.W..WW.......WWW.....W.W...WW..W..WW.WW.......W.W....WWW.W..
    W.W.W.W.W...W...W.W...WW....W.W...W..W..W....W.....W.W..W.....WW.......
    ......WWW....W..W...........W.......W..W...WW...WW.........W.W.W..W...W
    .......................WW.WWWWWW.WW.W..W..W.....WW.W.W.W...W.W.W.W.....
    ...WW.WW..........W......W.W..W..W...WWW.WW....W..WW....W...W..W.W..WW.
    .W.W...W.W...W..W...WW.W....W...W.WW...WWW.....W....W..WWWWW..WW.....W.
    .W.W.W.W....WW..........WW.....WW.W..W...W.WW.W.....WWW.......W.WW.....
    .WW...W..WW.W..W......W.W........W..WWW..W..............W.W.W....W.WW.W
    ...WW.WWW...W.W......WW...W..W.......W.WWW..WW.....W...W...W..WWWW.....
    ...W.WW...............................W.W.W.WW.W...W.......W.W.WWWWWWWW
    ....WW.W.....W......W............W.WW..WWW...WW.W......W.......W.......
    WW.W..W......W.........WW...W........WW.W..W....W..W..WW....WW.........
    .W..WW..WWW........WW.W....W....WW.................W....W...W...W..W.WW
    W....W.......W.W...W......W......WWW.W...W....WW.W.WW.WW.WWW..W.W.W....
    ....W..........W............W.W.........W...W.W.WWWW..W........WW....WW
    WWW........W......WW.....W.....W.WW..W......W.WWWW...W..WWW....WW...WW.
    ...W.......WW.W......WW...W......W.........WW.W...W..W...WWW...W....W..
    .........W..WWW....W...........W..WW...W.WWWWW....WW...W......W........
    WW..W......W..W..............W.....W....WW.W...........W..W..W....W..W.
    ...........W.WW.W......W.WWW..W.W............W...........WW...W...W..W.
    W..W.............WWW.W......W.W.....W...W.WWW....W.W..WW.W.....W..W.WW.
    .WW...WW....W..WWW..WW...W.WW.....W..WWW..W.W.W.W..W..WW.W...WWW..WW...
    W.W...W...W...W....W......WW.W.W.W.W..W.WW......W....W.....W..........W
    .....W.W.WW.........WWW.W.......W..WWWW.......W..WW.....W..W...W.....W.
    ..W.W...W....WW........W.WW..WW........W.W.W......W.W..W.W...W.WW.W..W.
    W...W.W......W.....WW..W.WW...W.WW.............WW..W.........W.WW....W.
    ...............W.W..WWW.WWW.W..W..WW...W...W.WWWW..W.W....WW..W......W.
    .W...W...W.W.W.....W.W......WWW.....W...WW.W..W.W.W.W.W..W..W.......W..
    ......WW........WW.WW....W..W.WW.W.................WW.W..........W....W
    .WW.W.W...............W....W.....WWWW......W.W..WWW.WW.W.....W..W......
    ...........W.......W.WW..W.WW..WW.....W.....W.W..WW....WW...WW.....W..W
    ...W...W.WWWW.W...W......W....W.W.W....WWW.....W.W.W....W......W......W
    ..W...W..W.......W.W..........W..........W.....W.W..........WW.....W.W.
    W....WW.W.W......W.....WWW.WW......WW.W....W.W....W.WW........W.W....W.
    .WW.....W......WWWW.W....W.WWW..W........W.....W.WW.....W.......W.W.W.W
    W.......W...W.WW.W......WWW.....WW....W..WWW.W....W.....W.........W....
    ..WW.....W.W...WW.W..W..........W..W.WW.....W....W..WW........WW.W....W
    ............W........WW......W.W.WWWW.....W.......W...W..W..W.W.W.....W
    .W.......W.WW.W.W......W....WW.W.WW.W.WW......W..............W.W...WWWW
    ..........W.W...WW....W............W..............WW....WW.W....W...WW.
    .W.............WW...WW..W..WWW..WW...W......W..W.....W.......WW..WWW.W.`
)

let test3 = (
  `.W.
  .W.
  W..`
)

let test_0 = test2

console.time('pathFinder_1')
let ans_1 = pathFinder(test_0)
console.timeEnd('pathFinder_1')

console.time('pathFinder_2')
let ans_2 = pathFinder2(test_0)
console.timeEnd('pathFinder_2')

console.log('ans_1', ans_1)
console.log('ans_2', ans_2)
