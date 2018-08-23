// http://www.codewars.com/kata/escape-the-maze/
const VALID_STEPS = {
    '^': {
        '^': 'F',
        '>': ['R', 'F'],
        'v': ['B', 'F'],
        '<': ['L', 'F'],
    },
    '>': {
        '^': ['L', 'F'],
        '>': 'F',
        'v': ['R', 'F'],
        '<': ['B', 'F'],
    },
    'v': {
        '^': ['B', 'F'],
        '>': ['L', 'F'],
        'v': 'F',
        '<': ['R', 'F'],
    },
    '<': {
        '^': ['R', 'F'],
        '>': ['B', 'F'],
        'v': ['L', 'F'],
        '<': 'F',
    },
}

const VALID_MOVEMENTS = {
    '0': {
        '-1': '<',
        '1': '>'
    },
    '1': {
        '0': 'v'
    },
    '-1': {
        '0': '^'
    }
}

class Spot {
    constructor (row, col, space = null, parent) {
        this.f = 0
        this.g = 0
        this.h = 0

        this.row = row
        this.col = col

        this.neighbors = []
        this.previous = null
        this.parent = parent

        this.wall = space == '#'
        this.start = ['^', '<', '>', 'v'].includes(space)
        this.exit = (space == ' ') && (
            row == 0 ||
            col == 0 ||
            row == this.parent.rows - 1 ||
            col == this.parent.cols - 1
        )

        this.move = this.start ? space : ''

        if (this.start) this.parent.setStart(this)
        if (this.exit) this.parent.addExit(this)
    }

    addNeighbors (grid) {
        let [row, col] = [this.row, this.col]
        let [width, length] = [grid[0].length - 1, grid.length - 1]

        if (row < length) {
            this.neighbors.push(grid[row + 1][col])            
        }
        if (col < width) {
            this.neighbors.push(grid[row][col + 1])
        }        
        if (row > 0) {
            this.neighbors.push(grid[row - 1][col])
        }
        if (col > 0) {
            this.neighbors.push(grid[row][col - 1])
        }
    }
}

class Maze {
    constructor (maze) {
        this.rows = maze.length
        this.cols = maze[0].length

        this.start
        this.exits = []

        this.maze = this._generateMaze(maze)
        this.grid = maze
    }

    _generateMaze(grid) {
        let arr = new Array(this.rows)
        for (let row = 0; row < this.rows; row++) {
            arr[row] = new Array(this.cols)

            for (let col = 0; col < this.cols; col++) {
                arr[row][col] = new Spot(
                    row,
                    col,
                    grid[row][col],
                    this
                )
            }
        }
        return arr
    }

    addNeighbors () {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.maze[row][col].addNeighbors(this.maze)
            }
        }
    }

    getStart () {
        return this.start
    }

    getExits() {
        return this.exits
    }

    setStart(start) {
        this.start = start
    }

    addExit (exit) {
        return this.exits.push(exit)
    }
}

function removeFromArray (arr, ele) {
    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] === ele) {
            arr.splice(i, 1)
        }
    }
}

function heuristicManhattan (a, b) {
    return Math.abs(a.row - b.row) + Math.abs(a.col - b.col)
}

function escape (grid) {
    let maze = new Maze (grid)

    maze.addNeighbors()

    let start = maze.getStart()
    let end = maze.getExits()[0]

    if (!end) return [] // no exits

    let openSet = [start]
    let closedSet = []
    let route = null

    while (openSet.length > 0) {
        let winner = 0
        for (let i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[winner].f) winner = i
        }

        let current = openSet[winner]

        if (current === end) {
            console.log('done')
            route = current
            break
        }

        removeFromArray(openSet, current)
        closedSet.push(current)

        for (const neighbor of current.neighbors) {
            if (closedSet.includes(neighbor)) continue
            if (neighbor.wall) continue

            let tempG = current.g + 1
            let newPath = false // only add to path if is a better route
            if (openSet.includes(neighbor)) {
                if (tempG < neighbor.g) {
                    neighbor.g = tempG
                    newPath = true
                }
            } else {
                neighbor.g = tempG
                newPath = true
                openSet.push(neighbor)
            }

            if (newPath) {
                neighbor.h = heuristicManhattan(neighbor, end)
                neighbor.f = neighbor.g + neighbor.h
                neighbor.previous = current

                let row = (neighbor.row - current.row) + ''
                let col = (neighbor.col - current.col) + ''

                neighbor.move = VALID_MOVEMENTS[row][col]
            }
        }
    }

    if (!route) return []

    let path = []
    let temp = route
    path.push(temp)
    while (temp.previous) {
        temp = temp.previous
        path.push(temp)
    }

    let moves = []
    for (const item of path) {
        moves.push(item.move)
    }

    moves = moves.reverse()

    let ans = []

    for (let i = 0; i < moves.length - 1; i++) {
        ans = ans.concat(VALID_STEPS[moves[i]][moves[i + 1]])
    }

    return ans
}

function main () {
    // let grid = [
    //     "#########################################",
    //     "#<    #       #     #         # #   #   #",
    //     "##### # ##### # ### # # ##### # # # ### #",
    //     "# #   #   #   #   #   # #     #   #   # #",
    //     "# # # ### # ########### # ####### # # # #",
    //     "#   #   # # #       #   # #   #   # #   #",
    //     "####### # # # ##### # ### # # # #########",
    //     "#   #     # #     # #   #   # # #       #",
    //     "# # ####### ### ### ##### ### # ####### #",
    //     "# #             #   #     #   #   #   # #",
    //     "# ############### ### ##### ##### # # # #",
    //     "#               #     #   #   #   # #   #",
    //     "##### ####### # ######### # # # ### #####",
    //     "#   # #   #   # #         # # # #       #",
    //     "# # # # # # ### # # ####### # # ### ### #",
    //     "# # #   # # #     #   #     # #     #   #",
    //     "# # ##### # # ####### # ##### ####### # #",
    //     "# #     # # # #   # # #     # #       # #",
    //     "# ##### ### # ### # # ##### # # ### ### #",
    //     "#     #     #     #   #     #   #   #    ",
    //     "#########################################"
    // ]
    let grid = [
        '#####################',
        '#     #   #       # #',
        '##### # ### ##### # #',
        '#       #       #   #',
        '# ####### # ####### #',
        '#   #     #     #   #',
        '### # ######### #####',
        '# #   #   #   #     #',
        '# ### # # # # ##### #',
        '#   # # # # #   #   #',
        '# # ### # # ### ### #',
        '# #     #     #     #',
        '# ##### ########### #',
        '# # #       #     # #',
        '# # # # ### # ### ###',
        '# #   # #   #   #   #',
        '# ### # ####### ### #',
        '# #   #   #   #   # #',
        '# # ##### ### ### # #',
        '# #     #^#   #   # #',
        '# ####### # # # ### #',
        '# #   #   # # #   # #',
        '# ### # ### # ### # #',
        '#     #     # #   # #',
        '############# # #####',
        '#         #     #   #',
        '# ####### # ### # # #',
        '# #     #   #   # # #',
        '# # # ####### ### ###',
        '# # #   #   # # #   #',
        '# # ### # # # # ### #',
        '# #   # # #   #   # #',
        '# ### # ####### ### #',
        '#     #           # #',
        '# ############# # # #',
        '# #           # # # #',
        '### ######### # # # #',
        '#   #   #   # # #   #',
        '# # # # # # ### #####',
        '# #   #   #         #',
        '#####################'
    ]

    let ans = escape(grid)

    console.log(ans)
}
console.time('escape')
main()
console.timeEnd('escape')