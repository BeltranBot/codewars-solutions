// https://www.codewars.com/kata/path-finder-number-2-shortest-path

const NEIGHBORS = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
]

class Node {

  constructor(row, col, value = null, previous = null) {

    this.f = 0
    this.g = 0
    this.h = 0

    this.row = row
    this.col = col
    this.previous = previous
    this.value = value
  }

  isWall() {
    return this.value === 'W'
  }
}

class Maze {

  constructor(maze) {
    this.grid = this._generateMaze(
      maze.split('\n').map(line => line.trim().split(''))
    )
  }

  _generateMaze(grid) {
    let new_grid = []

    for (let row = 0; row < grid.length; row++) {
      let grid_row = []
      for (let col = 0; col < grid[row].length; col++) {
        grid_row.push(new Node(row, col, grid[row][col]))
      }

      new_grid.push(grid_row)
    }

    return new_grid
  }

  getHeight() {
    return this.grid.length
  }

  getWidth() {
    return this.grid[0].length
  }

  neighborExists([row, col]) {
    return this.grid[row] && this.grid[row][col]
  }
}

function pathFinder(m) {

  function heuristicManhattan(a, b) {
    return Math.abs(a.row - b.row) + Math.abs(a.col - b.col)
  }

  let maze = new Maze(m)

  let start = maze.grid[0][0]
  let end = maze.grid[maze.getHeight() - 1][maze.getWidth() - 1]

  let open_set = new Set()
  let closed_set = new Set()
  let route = null
  open_set.add(start)

  while (open_set.size) {

    let current = [...open_set].reduce((a, c) => c.f < a.f ? c : a, { f: Infinity })

    if (current == end) {
      route = current
      break
    }

    // remove current from openset
    open_set.delete(current)
    closed_set.add(current)

    for (const [n_row, n_col] of NEIGHBORS) {
      let next_row = n_row + current.row
      let next_col = n_col + current.col

      if (!maze.neighborExists([next_row, next_col])) continue
      let neighbor = maze.grid[next_row][next_col]

      if (closed_set.has(neighbor)) continue
      if (neighbor.isWall()) continue

      let temp_g = current.g + 1
      let new_path = false // only add path if is a better route

      if (open_set.has(neighbor)) {
        if (temp_g < neighbor.g) {
          neighbor.g = temp_g
          new_path = true
        }
      } else {
        neighbor.g = temp_g
        new_path = true
        open_set.add(neighbor)
      }

      if (new_path) {
        neighbor.h = heuristicManhattan(neighbor, end)
        neighbor.f = neighbor.g + neighbor.h
        neighbor.previous = current
      }
    } // end for
  } // end while

  return !route ? false : route.g
}

let tests = [
  `.W...
  .W...
  .W.W.
  ...W.
  ...W.`,
  (
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
  ),
  (
    [
      ".............W...WW.WW.......WW...W.W..W.............W.W....W...W..........WW...W...W...W.....W.W...",
      ".........W...W..W..W....W...W....W..................WW..W.WW.W..W..WW.......W....W......W..W.....W.W",
      "W.W.W......W..W...WWW.W.W....W.W......W......................W.....W.W.W...W..............W.....WW..",
      "W..............W.....WWW........WW...WW..WW.....WWW.W.....WWW.WW...W.......W....WW...W.W.W..........",
      "W.WWW....W.....W.....W....WW....WW..WWW.W..WWW.W.WW..W..........WW.W......W.W....W......WW...W.W.W.W",
      ".W.WW..W..W...W.................WW.W.WW.W.....W.....WW..W.....W..W.W..W..W....W.W...W..WW.....WWW...",
      "...W.....W...W..W......WW..W......W.......W.W....W...........W...W.......W..WWWW..W.W...W...W.W..W.W",
      "....W........WWW.WW......W..W.W..W..W..WW.......W...W.......W.WWWWW.....W.....WW..WW..W.W.WW.W.WWW..",
      ".....WW....WW..WW....WWW.....W...........W..........W....WW..W.W...W..WW...........W.....WWW........",
      "......WW.....W...........W..WW...W......W...W.WW..W.........WW....W.......WWW.........W...W.W.......",
      ".W.....W...W.....W........W....WW..........WW..W..W.WW......W...WWW...W........W.WW..........W.W....",
      "........W.WW.......W.....W....W..W..WWW.W........W.....WWW.W..WW.........WW......W....W..WWW..WWWW.W",
      "......W..W.W..W.W.W.W.W.WW....WW......WW.WW....WW..WWW...W......W..WW.WW.WWW......W..WW.......WW....",
      "W.W.WWW..................W.WW.W..W..W...................W....W.W.W...W.W....WW..W....WW......WWW....",
      "WWW..W..W........W..............W.W....W.W.W...W....W.......WW..WWWW....WW...W.W..W.W.W.W....WW.WW.W",
      ".........W........WWWW.W..W..WWW...W......W.........W...........W..W....W...WW.W.W.....W.W..........",
      "....WW.WW..W.W.....W....W...WWW.....WW...WW.......WW.....WW.W....W...W..W..WW.W..W...........W..W...",
      "......W.W........W..W......W....W.W...W....WW..W......W.WW.W...W.W.WWWW...W.......W....WW....WWW..W.",
      "........W..W...WWW..W..........WW...WWWWW......W...W...WW...W...W...W.W.....W...W...W..W..W...W..WW.",
      "W.W.WW.W.....W.........W....W..W.W..WW..............W.W............WW...WW...WWW....W.......W...W...",
      ".W..W..W.W....W....................WW...W....W.....W....W.W...W....W...W..W..W...W.....W.....W....W.",
      ".WW.WW..W.............W..W.....W..W...W...W..W..........W..W....W.........WW.W.....WW.....W..W......",
      "W.......W..WW......WW...W.W.W.......W.W.W.......WWW...W..............WW.....W.........W.......W....W",
      "..W........W...W..W........W.W.W.........W.W...WW.W...WW......W...W.WW.....WW...............WWW.W..W",
      ".W.....WW...W..W..........W.WWW..WWW...W...W...W....WW.W..W..W..W...W....WW.........W...W....W.W..WW",
      "..WW..W.....W.W.W..W.....W...W...WW...W........WWW....W..WW.WW.WW...W....W...W..............W.......",
      "W..W....W..W.....WW...W.WW..W....W..WW...WW.....W.....W.........W.......WWW.W.W..W...WWWWW....W.....",
      "..........W.....W.WWW.W......WW.W....W....WWW....W.WWWW..WWW..........W......WW.W..W...W......W.W...",
      "........W....W.......W....W....WWW...WWW..W......WWWW...W..W......WWW....W..WW..........W....W.W...W",
      "..W.W...W....W..W.W...W.....WW..W..........W..W.WW....WW..W.......W.W...W.W......W.....WW......WW...",
      "....WW.....W...WWW........W...W....W.....WW......W.......W..W..W...W...W..W....W.W.......W....W.W...",
      "WWW.....W.W..WW.............WW.W..W.....WW.W.W...W...WWW..W..W.........W..W.W..........WW..W.WW.....",
      "..W......WW...W..W..WW...W..W...W.W...WW..W.........W..W.....W.WW.....W........W..W..............W.W",
      "........W.W.W....W.....WW..WW..WW...WW...W..WW......W.W....W.WW.W..W..W.W........W.......W.W.W....W.",
      "..W....W.W.W..W.WW..W.......W.W..W.W.....W....W..WW..............W..W.W..W.........W....W.W.WW..W..W",
      "......W..........W.W.....W.W........WWW.W...W..............W...WWW..W.W.........W......W.W...W......",
      ".W.....W.W.............W...W..W..W.....W......W....W.WW.WW..WW..W...WW.....W.W...WW...........W..W.W",
      ".....W..W.W.W.....W..WWWW..W...W.W.......W.......W...WW..W.W.......W.W....W.....W.W.....W..WW.WW..WW",
      ".W.WW.......W.W...W.......WW...W..WWW......WWW..W.....W...W..W.W.....WW..W..W...W...W........W...W..",
      "....W.....W.......W....W.W...........W.WW....W..........W.....WW.....W.W.W.WW....W...W....WW........",
      ".......WW.......W...W.WW....WW.W..W...W.W...WW....WW..W....W...W......W..W..WW...W..WW...W...W......",
      "..WW..W.......W..WW.....W..WWW.....W.WW.....WW....W..W...W...W....W....W...W....WW..W.W....W..W.W..W",
      ".......W..WWWW..WW....W........W...W.W..WWWW.......W...W.WW.WW.W........W...W....W.WWW.W...........W",
      "W......W.WW..WW...WW...W..W.W...W.W.........W...........WW.......WWW..W..W.W..W........W....W.W..W..",
      "......WWW....WW....W....W........W....W...W.W......WW......................WW..W...W........W..W..WW",
      "W.....W.WWW..W..W.W...........W...WW.W..WW....W.....WW..W.W..WW.W....W.W.W......W..W.W......WW.....W",
      "......WW..WW.W.W......W.W.WW........WW.W.W..........W....W........WW.........WW.WW...........W..W...",
      "W..WWW.....WW.....W...W.W.......W..WW....W...WW......WW..W.............W..W..W..WW.W.W......W...WWWW",
      "W.W..W..W....W....WW...W..WWW...W.......WW...W......WWW..W....W....W.W...W.WW.....W...W.....WW......",
      "....W........W.........WW...W....WW...W.WWWW..W.W...W...W..........W.....W.....W...WW....WW.WW......",
      ".........W....WW...W.WWWW.WW................W........W......W.W.WWW.W.......W.W.W.W....W.........WWW",
      "W......WW..WWW.......W......W......W........WW.......W..........................WW....W...WW..W..WW.",
      "W....WWW.WWW....W........W...W.....W....W..........WW.WW.....WW.WW.WW...W.W....WW.......W......W.WW.",
      "...W.....W.W.W...WW......WW...WW.....W..W....WW.......W.......W...W.....W..W.....W.WW.WW.WW......WW.",
      ".W..........W.W..WWW...W.......................W..W..WW....W.W.W..WW........WW.............W...W.W..",
      ".WW..W...W......W....W...WW.....W.......W.W..W.....WW...W.W...W..W.WW.....WW..........W........W....",
      "W.WW..WW....W....W..W...W.......W.W...W...W...WW.WW......WWW.....W.W...WW.....WWWW..W.W....W...W....",
      ".W.W...............W......WW...WW.....WWWW......W...W...W..W..W..WW...W........W.........W..........",
      ".W.......WW..WW.WWWW....W..W.WW.W.W....W....W......W..W....WW....W.W.W.W.W......W.W.WW.W..W..W.W....",
      "W.....W...W..W...W...W.W...WWW......W..WW...W..W.........W..W......W....W....WW.....W........W..W.W.",
      "...W.....WW.WWW....W..W.W....WW..W.....W.W.W...W.W..W....W.W.W......W.W.....W.W........W...W.W......",
      "W...W.W..W.W........W.....W.W.....W.WWWW......W...W.....WWWW..W..........W.W..W.W.W.WW.W.....W......",
      ".......W..........WW...W.......W..W..W..W.........W..WW.WW..................WW.........WW..W......W.",
      ".WW...W.....WW..W.W......W...WW.W.W.W.............WW..W....W...WWW......W...WW.......WW..W.W.WW.....",
      "WWW..WW.........W..WW.W......W....W..WW...W.W..W...W......WW.........W.......................WW....W",
      ".W..W........WW...W.....W......WW...W.W...WW.W..........WWW.W..W............W.........W..W.W.W..W...",
      ".W.W.......W...WW.W..W...W......W.W........W......W.W...W.W..........W.W..W.....W..WW.W...W.W.W....W",
      ".WWW.W.W......WW.........WW..W......WW..W.WW.W.W..W..W..W.WW...W...........W.....W.W......W.....W...",
      ".........WW.....W...W.W............WWW..W.......W.......WW......WWW.W...WWW..W..WW.W..........W.....",
      "WW....W.....WWW.W...WW.W...............W..W.........W.W.W.......WWW.WWW.......W.....W.W.WWW.WW...W..",
      "...W....W..W.W.W.WWW..W..W..W..W.W...WWW..........WW.W.W.....WWW..WW.....W.WWW...W...W..W.W..W....WW",
      "..W.....WWW............WW........W..W.....W.W....W..W..WWW.W..W.......W.....W.W........W....W.......",
      "......W..............W...W....WW......W...WWWW...W..........W..W.WW.W....WW..W.....W.W....W.....WW..",
      "......WWW...WW........W.W..........W...WW.....W.....W...W..W....W..W..WWWW.WW...WW......W...WWWW...W",
      "W..W.....W.WWW....WW.....W....W..........WW.W..WW.......W........W.WW...W.....W.....W...WW...WW....W",
      "............WW..W.W...WW.W....WWW....W....W.....W.W..W.W........W.....W..W.W....W....WW.............",
      ".W..W......W..WW.WWWW.W....WWW...W.....WW.........W....W.........WW....W.W..............W......W.W..",
      ".......WWW..W.W..W..W....W..W..W..W..WWWWW.W.....W...W.....W.WW....WW.W....WW..W......WWW.....W...W.",
      ".W.W...W.WW....WWW.......W.W....W.................W......WW.WW..W.WW...WWWW..W..WW.W..W.W...........",
      "....WWW...W.....W.......WW..W....................W....W..WW..W.W..W.W..W..W.WW..W...W..W..W..W......",
      ".....W...WW.....W.W..W.....WWW......WW..W...W....W.W..W.W.W....W....W.....W..W.......W.........W....",
      ".....W................W.W...WW.WW.W.WW..WW......W.W.....W....W..W..W...W.....WWW..WWW.W.W..WW.W.W...",
      "W.....W.....W.WW..W..W.W..W.......W..W...WW....W.........WW...W.W..W.W....W...WW.....W.W..W..WW..W..",
      "...W...........WW.........WW..W.......W..W.....W.....WW.....W......W.....W..W.W.......W..WW.W....W..",
      "W.......W.W.W..........W.W.W..W.W......W.WW.....WWW..W..W....WWW...W.W.WW....W...W.W.........WWW..W.",
      "W......W..W...WWWW....W......W..WW....W..................W.....WW.W...W..W...W..WWW......W....W.W.WW",
      "..W.W.W.WW.W.WW.WW.....WW....W..W..W...W......W......W.WW....W..W......W.W..W..W......W...WW..W.W...",
      ".WW........W......W......W.W..W.....WW...W.....WW.....W........W.W...WW.....W..........WW.W.......W.",
      "....WW.W..W...W.WW...W......W.W.W...W.W.W...WW.W.......W..W...W.W.....W......W...W..WW...WWW..W.W...",
      "WWWW.W.....W.W.W..W.....W.....W....WW..W.....WW...W.W.......W.........WW.W..W....W......W...W.W.W.W.",
      "............WW..W...W....WW......W...W.W.W....W...WW...W..WWW..W......W....WW...W..WW....WWW..WW.W..",
      "W..........W...W............W...W.....W...WW.....WW...W.WW.....W..W..WW.W.W.W...WW.W.W...WW...W....W",
      "W...W.W..................W..W..W....W....W....W...W.......W...W..W.W.WWWW.W.W..WW.....WWW...W....W..",
      "W.WW......................W..W.....W...W.W..W.......WW.........WWWWWW........W....W...W.W.....W.....",
      ".W..WWW.WW....WW.........W.W..WW.W...W......W.W.W....W.W..W.....W.WW......WW.........WWW...........W",
      "W...WW...W..W...W.W...WWW......WW...W......WW.............W....W..W...........W....W.W.....WW.W...W.",
      "...W.....W.W..W..W...W.W....WW.W.......W.W.......W....W....W.W...W...W..W........W..WW.WW..W....W.WW",
      "W.....WW....W..WW.....WW..W.WW.W...W..WW...W....WWW......W.WW............W..W.W........W..W..W.W..W.",
      ".....W.W..W....W...WW..W......W..WW..W...........W......W.WW.WW..W......W..W.WW.........W...W.W..W..",
      ".W.....W..W.W...WW..WW.......W.WW..........W....W..W....W..WW....WW..W.WW.......W...W...W....W....W.",
    ].join('\n')
  )
]

console.time('pathFinder')
let ans = pathFinder(tests[2])
console.timeEnd('pathFinder')

console.log('ans', ans)
