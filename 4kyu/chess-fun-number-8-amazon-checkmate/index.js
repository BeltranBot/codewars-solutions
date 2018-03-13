// www.codewars.com/kata/chess-fun-number-8-amazon-checkmate/
const INVALID = 0
const SAFE_SQUARE = 1
const CHECKMATE = 2
const CHECK = 3
const AMAZON = 4
const KING = 5
const ABC_KEYS = [...'abcdefgh'].reduce((o, k, v) => {
    o[k] = v
    return o
}, {})
const SIZE = 8

class Board {

    constructor (size = SIZE) {
        this._size = size
        this._grid = this.initializeGrid(this._size)
    }

    initializeGrid(n, v = SAFE_SQUARE) {http://www.codewars.com/kata/credit-card-issuer-checking
        let grid = [...new Array(n)].map(x => [...new Array(n)])
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                grid[i][j] = new Square()
                
            } 
        }
        return grid
    }

    positionPiece (piece, pos) {
        switch (piece) {
            case 'amazon':
                this.positionAmazon(...pos)
                break
            case 'king':
                this.positionKing(...pos)
                break
            default:
                break
        }
    }

    printBoard () {
        let grid = []
        let k = 0

        for (let i = 0; i < this._size; i++) {
            grid.push([])
            for (let j = 0; j < this._size; j++) {
                switch (this._grid[i][j]._piece) {
                    case null:
                        grid[k].push(this._grid[i][j]._state + "")
                        break
                    case 'amazon':
                        grid[k].push('A')
                        break
                    case 'king':
                        grid[k].push('K')
                        break
                }
            }
            k++            
        }
        console.log(grid)
    }

    printStates () {
        let grid = []
        let k = 0

        for (let i = 0; i < this._size; i++) {
            grid.push([])
            for (let j = 0; j < this._size; j++) {
                grid[k].push(this._grid[i][j]._state)
            }
            k++            
        }
        console.log(grid)
    }

    positionAmazon (x, y) {
        this._grid[x][y].setPiece('amazon')

        function checkUpLeft (x, y, grid) {
            if (--x >= 0 && --y >= 0 && grid[x][y].isEmpty()) {
                if (grid[x][y].isValid()) {
                    grid[x][y].setState(CHECK)    
                }
                checkUpLeft(x, y, grid)
            }
        }

        function checkHorseUpLeft (x, y, grid) {
            x -= 2
            if (x >= 0 && --y >= 0 && grid[x][y].isEmpty()) {
                if (grid[x][y].isValid()) {
                    grid[x][y].setState(CHECK)
                }
            }
        }
        
        function checkUp (x, grid) {
            if (--x >= 0 && grid[x][y].isEmpty()) {
                if (grid[x][y].isValid()) {
                    grid[x][y].setState(CHECK)
                }
                checkUp(x, grid)
            }
        }
        
        function checkHorseUpRight (x, y, grid) {            
            x -= 2
            if (x >= 0 && ++y < grid.length && grid[x][y].isEmpty()) {
                if (grid[x][y].isValid()) {
                    grid[x][y].setState(CHECK)
                }
            }
        }

        function checkUpRight (x, y, grid) {
            if (--x >= 0 && ++y < grid.length && grid[x][y].isEmpty()) {
                if (grid[x][y].isValid()) {
                    grid[x][y].setState(CHECK)
                }
                checkUpRight(x, y, grid)
            }
        }

        function checkHorseRightUp (x, y, grid) {
            y += 2
            if (--x >= 0 && y < grid.length && grid[x][y].isEmpty()) {
                if (grid[x][y].isValid()) {
                    grid[x][y].setState(CHECK)
                }
            }
        }

        function checkRight (y, grid) {
            if (++y < grid.length && grid[x][y].isEmpty()) {
                if (grid[x][y].isValid()) {
                    grid[x][y].setState(CHECK)
                }
                checkRight(y, grid)
            }
        }

        function checkHorseRightDown (x, y, grid) {
            y += 2
            if (++x < grid.length && y < grid.length && grid[x][y].isEmpty()) {
                if (grid[x][y].isValid()) {
                    grid[x][y].setState(CHECK)
                }
            }
        }

        function checkRightDown (x, y, grid) {
            if (++x < grid.length && ++y < grid.length && grid[x][y].isEmpty()) {
                if (grid[x][y].isValid()) {
                    grid[x][y].setState(CHECK)
                }
                checkRightDown(x, y, grid)
            }
        }

        function checkHorseDownRight (x, y, grid) {
            x += 2
            if (x < grid.length && ++y < grid.length && grid[x][y].isEmpty()) {
                if (grid[x][y].isValid()) {
                    grid[x][y].setState(CHECK)
                }
            }
        }

        function checkDown (x, grid) {
            if (++x < grid.length && grid[x][y].isEmpty()) {
                if (grid[x][y].isValid()) {
                    grid[x][y].setState(CHECK)
                }
                checkDown(x, grid)
            }
        }

        function checkHorseDownLeft (x, y, grid) {
            x += 2
            if (x < grid.length && --y >= 0 && grid[x][y].isEmpty()) {
                if (grid[x][y].isValid()) {
                    grid[x][y].setState(CHECK)
                }
            }
        }

        function checkDownLeft (x, y, grid) {
            if (++x < grid.length && --y >= 0 && grid[x][y].isEmpty()) {
                if (grid[x][y].isValid()) {
                    grid[x][y].setState(CHECK)
                }
                checkDownLeft(x, y, grid)
            }
        }

        function checkHorseLeftDown (x, y, grid) {
            y -= 2
            if (++x < grid.length && y >= 0 && grid[x][y].isEmpty()) {
                if (grid[x][y].isValid()) {
                    grid[x][y].setState(CHECK)
                }
            }
        }

        function checkLeft (y, grid) {
            if (--y >= 0 && grid[x][y].isEmpty()) {
                if (grid[x][y].isValid()) {
                    grid[x][y].setState(CHECK)
                }
                checkLeft(y, grid)
            }
        }

        function checkHorseLeftUp (x, y, grid) {
            y -= 2
            if (--x >= 0 && y >= 0 && grid[x][y].isEmpty()) {
                if (grid[x][y].isValid()) {
                    grid[x][y].setState(CHECK)
                }
            }
        }

        checkUpLeft(x, y, this._grid)
        checkHorseUpLeft(x, y, this._grid)
        checkUp(x, this._grid)
        checkHorseUpRight(x, y, this._grid)
        checkUpRight(x, y, this._grid)
        checkHorseRightUp(x, y, this._grid)
        checkRight(y, this._grid)
        checkHorseRightDown(x, y, this._grid)
        checkRightDown(x, y, this._grid)
        checkHorseDownRight(x, y, this._grid)
        checkDown(x, this._grid)
        checkHorseDownLeft(x, y, this._grid)
        checkDownLeft(x, y, this._grid)
        checkHorseLeftDown(x, y, this._grid)
        checkLeft(y, this._grid)
        checkHorseLeftUp(x, y, this._grid)
    }

    positionKing (x, y) {
        this._grid[x][y].setPiece('king')
        this._grid[x][y].setState(INVALID)


        let i = x - 1
        let j = y - 1
        if (i >= 0 && j >= 0) {
            this._grid[i][j].setState(INVALID)
        }

        i = x - 1
        j = y
        if (i >= 0) {
            this._grid[i][j].setState(INVALID)
        }

        i = x - 1
        j = y + 1
        if (i >= 0 && j < this._size) {
            this._grid[i][j].setState(INVALID)
        }

        i = x
        j = y + 1
        if (j < this._size) {
            this._grid[i][j].setState(INVALID)
        }
        
        i = x + 1
        j = y + 1
        if (i < this._size && j < this._size) {
            this._grid[i][j].setState(INVALID)
        }

        i = x + 1
        j = y
        if (i < this._size) {
            this._grid[i][j].setState(INVALID)
        }

        i = x + 1
        j = y - 1
        if (i < this._size && j >= 0) {
            this._grid[i][j].setState(INVALID)
        }

        i = x
        j = y - 1
        if (j >= 0) {
            this._grid[i][j].setState(INVALID)
        }
    }

    checkBlackKing () {
        let checkmate = 0
        let check = 0
        let stalemate = 0
        let safesquare = 0

        for (let i = 0; i < this._size; i++) {
            for (let j = 0; j < this._size; j++) {
                if (!this._grid[i][j].isValid()) continue
                if (!this._grid[i][j].isEmpty()) continue
                if (this._grid[i][j].isSafe()) {
                    if (!checkAround(i, j, this._grid)) {
                        stalemate++
                    } else {
                        safesquare++
                    }
                    continue
                }
                if (!checkAround(i, j, this._grid)) {
                    this._grid[i][j].setState(CHECKMATE)
                    checkmate++
                } else {
                    check++
                }                
            }            
        }

        function checkAround(x, y, grid) {
            let i = x - 1
            let j = y - 1
            let size = grid.length

            if (i >= 0 && j >= 0 && grid[i][j].isSafe()) return true
    
            i = x - 1
            j = y
            if (i >= 0 && grid[i][j].isSafe()) return true
    
            i = x - 1
            j = y + 1
            if (i >= 0 && j < size && grid[i][j].isSafe()) {
                return true
            }
    
            i = x
            j = y + 1
            if (j < size && grid[i][j].isSafe()) return true
            
            i = x + 1
            j = y + 1
            if (i < size && j < size && grid[i][j].isSafe()) {
                return true
            }
    
            i = x + 1
            j = y
            if (i < size && grid[i][j].isSafe()) return true
    
            i = x + 1
            j = y - 1
            if (i < size && j >= 0 && grid[i][j].isSafe()) {
                return true
            }
    
            i = x
            j = y - 1
            if (j >= 0 && grid[i][j].isSafe()) return true

            return false
        }
        
        return [checkmate, check, stalemate, safesquare]
    }
}

class Square {

    constructor (state = SAFE_SQUARE) {
        this._state = state
        this._piece = null
    }

    setPiece (piece) {
        this._piece = piece
    }

    setState (state) {
        this._state = state
    }

    isValid () {
        return this._state != INVALID
    }

    isEmpty () {
        return this._piece == null
    }

    isSafe () {
        return this._state == SAFE_SQUARE
    }
}

function amazonCheckmate (king, amazon) {
    king = king.split('')
    king = [SIZE - +king[1], ABC_KEYS[king[0]]]
    amazon = amazon.split('')
    amazon = [SIZE - +amazon[1], ABC_KEYS[amazon[0]]]

    let board = new Board()

    board.positionPiece('king', king)
    board.positionPiece('amazon', amazon)

    let ans = board.checkBlackKing()

    return ans
}