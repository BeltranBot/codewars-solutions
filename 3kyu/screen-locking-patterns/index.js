// http://www.codewars.com/kata/screen-locking-patterns

const DOTS = {
    A: [0, 0],
    B: [0, 1],
    C: [0, 2],
    D: [1, 0],
    E: [1, 1],
    F: [1, 2],
    G: [2, 0],
    H: [2, 1],
    I: [2, 2],
}

class Node {
    constructor (id, row, col, parent) {
        this.row = row
        this.col = col

        this.id = id
        this.visited = false

        this.parent = parent
    }

    _getNeighbors (states) {
        let p = this.parent
        let n = []
        let [a, b, c, d, e, f, g, h, i] = Object.keys(DOTS).map(key => {
            let [x, y] = DOTS[key]
            return states[x][y]
        })

        switch (this.id) {
            case 'A':
                if (!b) n.push(p.getNode('B'))
                if (b && !c) n.push(p.getNode('C'))
                if (!d) n.push(p.getNode('D'))
                if (!e) n.push(p.getNode('E'))
                if (!f) n.push(p.getNode('F'))
                if (d && !g) n.push(p.getNode('G'))
                if (!h) n.push(p.getNode('H'))
                if (e && !i) n.push(p.getNode('I'))
                break
            case 'B':
                if (!a) n.push(p.getNode('A'))
                if (!c) n.push(p.getNode('C'))
                if (!d) n.push(p.getNode('D'))
                if (!e) n.push(p.getNode('E'))
                if (!f) n.push(p.getNode('F'))
                if (!g) n.push(p.getNode('G'))
                if (e && !h) n.push(p.getNode('H'))
                if (!i) n.push(p.getNode('I'))
                break
            case 'C':
                if (b && !a) n.push(p.getNode('A'))
                if (!b) n.push(p.getNode('B'))
                if (!d) n.push(p.getNode('D'))
                if (!e) n.push(p.getNode('E'))
                if (!f) n.push(p.getNode('F'))
                if (e && !g) n.push(p.getNode('G'))
                if (!h) n.push(p.getNode('H'))
                if (f && !i) n.push(p.getNode('I'))
                break
            case 'D':
                if (!a) n.push(p.getNode('A'))
                if (!b) n.push(p.getNode('B'))
                if (!c) n.push(p.getNode('C'))
                if (!e) n.push(p.getNode('E'))
                if (e && !f) n.push(p.getNode('F'))
                if (!g) n.push(p.getNode('G'))
                if (!h) n.push(p.getNode('H'))
                if (!i) n.push(p.getNode('I'))
                break
            case 'E':
                if (!a) n.push(p.getNode('A'))
                if (!b) n.push(p.getNode('B'))
                if (!c) n.push(p.getNode('C'))
                if (!d) n.push(p.getNode('D'))
                if (!f) n.push(p.getNode('F'))
                if (!g) n.push(p.getNode('G'))
                if (!h) n.push(p.getNode('H'))
                if (!i) n.push(p.getNode('I'))
                break
            case 'F':
                if (!a) n.push(p.getNode('A'))
                if (!b) n.push(p.getNode('B'))
                if (!c) n.push(p.getNode('C'))
                if (e && !d) n.push(p.getNode('D'))
                if (!e) n.push(p.getNode('E'))
                if (!g) n.push(p.getNode('G'))
                if (!h) n.push(p.getNode('H'))
                if (!i) n.push(p.getNode('I'))
                break
            case 'G':
                if (d && !a) n.push(p.getNode('A'))
                if (!b) n.push(p.getNode('B'))
                if (e && !c) n.push(p.getNode('C'))
                if (!d) n.push(p.getNode('D'))
                if (!e) n.push(p.getNode('E'))
                if (!f) n.push(p.getNode('F'))
                if (!h) n.push(p.getNode('H'))
                if (h && !i) n.push(p.getNode('I'))
                break
            case 'H':
                if (!a) n.push(p.getNode('A'))
                if (e && !b) n.push(p.getNode('B'))
                if (!c) n.push(p.getNode('C'))
                if (!d) n.push(p.getNode('D'))
                if (!e) n.push(p.getNode('E'))
                if (!f) n.push(p.getNode('F'))
                if (!g) n.push(p.getNode('G'))
                if (!i) n.push(p.getNode('I'))
                break
            case 'I':
                if (e && !a) n.push(p.getNode('A'))
                if (!b) n.push(p.getNode('B'))
                if (f && !c) n.push(p.getNode('C'))
                if (!d) n.push(p.getNode('D'))
                if (!e) n.push(p.getNode('E'))
                if (!f) n.push(p.getNode('F'))
                if (h && !g) n.push(p.getNode('G'))
                if (!h) n.push(p.getNode('H'))
                break
            default:
                break
        }

        return n
    }

    countPatterns (goal, count = 0, states = null, patterns = 0) {
        count++

        if (goal == 0) return 0
        if (count >= goal) return 1

        states = this.parent.cloneStates(states)

        let [i, j] = DOTS[this.id]
        
        states[i][j] = true

        let neighbors = this._getNeighbors(states)

        for (const neighbor of neighbors) {
            patterns += neighbor.countPatterns(goal, count, states)
        }

        return patterns
    }
}

class Graph {
    constructor (rows, cols) {
        this.rows = rows
        this.cols = cols

        this.grid = this._initializeGrid(this.rows, this.cols)
    }

    _initializeGrid (rows, cols) {
        let grid = new Array(rows)
        let ids = Object.keys(DOTS)

        for (let i = 0; i < grid.length; i++) {
            grid[i] = new Array(cols)            
            for (let j = 0; j < grid[i].length; j++) {
                grid[i][j] = new Node(ids.shift(), i, j, this)
            }
        }

        return grid
    }

    getNode (id) {
        let [i, j] = DOTS[id]
        return this.grid[i][j]
    }

    cloneStates (grid) {
        if (!grid) grid = this.grid

        let states = new Array(this.rows)
        for (let i = 0; i < this.rows; i++) {
            states[i] = new Array(this.cols)
            for (let j = 0; j < grid[i].length; j++) {
                states[i][j] = grid[i][j].visited === undefined ?
                    grid[i][j] ? true : false : grid[i][j].visited
            }
        }

        return states
    }
}

function countPatternsFrom(firstDot, length) {
    if (length == 0 || length > 9) return 0

    let rows = 3
    let cols = 3

    let graph = new Graph(rows, cols)
    let start = graph.getNode(firstDot)

    return start.countPatterns(length)
}

let firstDot = 'E'
let length = 8
let ans = countPatternsFrom(firstDot, length)

console.log(firstDot, ans)