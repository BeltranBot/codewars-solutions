// https://www.codewars.com/kata/path-finder-number-1-can-you-reach-the-exit

function pathFinder(maze) {
  let grid = maze.split('\n').map(line => line.trim().split(''))

  let neighbors = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ]

  const [GOAL_ROW, GOAL_COL] = [grid.length - 1, grid[0].length - 1]

  function searchGoal(grid, current_pos = [0, 0]) {
    let [cur_row, cur_col] = current_pos

    if (cur_row === GOAL_ROW && cur_col === GOAL_COL) return true    
    if (grid[cur_row][cur_col] === 'W' || grid[cur_row][cur_col] === '') {
      return false
    }

    grid[cur_row][cur_col] = ''

    for (let [n_col, n_row] of neighbors) {
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

let test = (
  `.W.
  .W.
  ...`
)

let ans = pathFinder(test)

console.log('ans', ans)