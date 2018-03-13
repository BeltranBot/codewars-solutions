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

function amazonCheckmate (king, amazon) {
    king = king.split('')
    king = [ABC_KEYS[king[0]], SIZE - +king[1]]
    amazon = amazon.split('')
    amazon = [ABC_KEYS[amazon[0]], SIZE - +amazon[1]]
    

    let board = new Board()
    board.positionKing(...king)
    board.positionAmazon(...amazon)

    let ans = board.checkBlackKing()
    console.log(board._grid)
    return ans
}

class Board {
    
    constructor (size = 8) {
        this._size = size
        this._grid = this.initializeGrid(this._size)
    }

    initializeGrid (n, v = SAFE_SQUARE) {
        return [...new Array(n)].map(x => [...new Array(n)].fill(v))
    }

    positionAmazon (y, x) {        
        if (this._grid[x][y] != INVALID) this._grid[x][y] = SAFE_SQUARE
        
        function checkUpLeft (x, y, grid) {
            if (--x >= 0 && --y >= 0) {
                if (grid[x][y] != INVALID) grid[x][y] = CHECK
                checkUpLeft(x, y, grid)
            }
        }

        function checkHorseUpLeft (x, y, grid) {
            x -= 2
            if (x >= 0 && --y >= 0) {
                if (grid[x][y] != INVALID) grid[x][y] = CHECK
            }
        }
        
        function checkUp (x, grid) {
            if (--x >= 0) {
                if (grid[x][y] != INVALID) grid[x][y] = CHECK
                checkUp(x, grid)
            }
        }
        
        function checkHorseUpRight (x, y, grid) {            
            x -= 2
            if (x >= 0 && ++y < grid.length) {
                if (grid[x][y] != INVALID) grid[x][y] = CHECK
            }
        }

        function checkUpRight (x, y, grid) {
            if (--x >= 0 && ++y < grid.length) {              
                if (grid[x][y] != INVALID) grid[x][y] = CHECK
                checkUpRight(x, y, grid)
            }
        }

        function checkHorseRightUp (x, y, grid) {
            y += 2
            if (--x >= 0 && y < grid.length) {
                if (grid[x][y] != INVALID) grid[x][y] = CHECK
            }
        }

        function checkRight (y, grid) {
            if (++y < grid.length) {
                if (grid[x][y] != INVALID) grid[x][y] = CHECK
                checkRight(y, grid)
            }
        }

        function checkHorseRightDown (x, y, grid) {
            y += 2
            if (++x < grid.length && y < grid.length) {
                if (grid[x][y] != INVALID) grid[x][y] = CHECK
            }
        }

        function checkRightDown (x, y, grid) {
            if (++x < grid.length && ++y < grid.length) {
                if (grid[x][y] != INVALID) grid[x][y] = CHECK
                checkRightDown(x, y, grid)
            }
        }

        function checkHorseDownRight (x, y, grid) {
            x += 2
            if (x < grid.length && ++y < grid.length) {
                if (grid[x][y] != INVALID) grid[x][y] = CHECK
            }
        }

        function checkDown (x, grid) {
            if (++x < grid.length) {
                if (grid[x][y] != INVALID) grid[x][y] = CHECK
                checkDown(x, grid)
            }
        }

        function checkHorseDownLeft (x, y, grid) {
            x += 2
            if (x < grid.length && --y >= 0) {
                if (grid[x][y] != INVALID) grid[x][y] = CHECK
            }
        }

        function checkDownLeft (x, y, grid) {
            if (++x < grid.length && --y >= 0) {
                if (grid[x][y] != INVALID) grid[x][y] = CHECK
                checkDownLeft(x, y, grid)
            }
        }

        function checkHorseLeftDown (x, y, grid) {
            y -= 2
            if (++x < grid.length && y >= 0) {
                if (grid[x][y] != INVALID) grid[x][y] = CHECK
            }
        }

        function checkLeft (y, grid) {
            if (--y >= 0) {
                if (grid[x][y] != INVALID) grid[x][y] = CHECK
                checkLeft(y, grid)
            }
        }

        function checkHorseLeftUp (x, y, grid) {
            y -= 2
            if (--x >= 0 && y >= 0) {
                if (grid[x][y] != INVALID) grid[x][y] = CHECK
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

    positionKing (y, x) {
        this._grid[x][y] = INVALID

        let i = x - 1
        let j = y - 1
        if (i >= 0 && j >= 0) {
            this._grid[i][j] = INVALID
        }

        i = x - 1
        j = y
        if (i >= 0) {
            this._grid[i][j] = INVALID
        }

        i = x - 1
        j = y + 1
        if (i >= 0 && j < this._size) {
            this._grid[i][j] = INVALID
        }

        i = x
        j = y + 1
        if (j < this._size) {
            this._grid[i][j] = INVALID
        }
        
        i = x + 1
        j = y + 1
        if (i < this._size && j < this._size) {
            this._grid[i][j] = INVALID
        }

        i = x + 1
        j = y
        if (i < this._size) {
            this._grid[i][j] = INVALID
        }

        i = x + 1
        j = y - 1
        if (i < this._size && j >= 0) {
            this._grid[i][j] = INVALID
        }

        i = x
        j = y - 1
        if (j >= 0) {
            this._grid[i][j] = INVALID
        }
    }

    checkBlackKing () {
        let checkmate = 0
        let check = 0
        let stalemate = 0
        let safesquare = 0

        for (let i = 0; i < this._size; i++) {
            for (let j = 0; j < this._size; j++) {
                if (this._grid[i][j] == SAFE_SQUARE) {
                    if (!checkAround(i, j, this._grid)) {
                        stalemate++
                    } else {
                        safesquare++
                    }
                    continue
                }
                if (this._grid[i][j] == INVALID) continue
                if (this._grid[i][j] == AMAZON) continue
                if (this._grid[i][j] == KING) continue
                if (!checkAround(i, j, this._grid)) {
                    this._grid[i][j] = 2
                    checkmate++
                } else {
                    check++
                }
            }            
        }

        function checkAround(x, y, grid) {
            let i = x - 1
            let j = y - 1

            if (i >= 0 && j >= 0 && grid[i][j] == SAFE_SQUARE) return true
    
            i = x - 1
            j = y
            if (i >= 0 && grid[i][j] == SAFE_SQUARE) return true
    
            i = x - 1
            j = y + 1
            if (i >= 0 && j < grid.length && grid[i][j] == SAFE_SQUARE) {
                return true
            }
    
            i = x
            j = y + 1
            if (j < grid.length && grid[i][j] == SAFE_SQUARE) return true
            
            i = x + 1
            j = y + 1
            if (i < grid.length && j < grid.length && grid[i][j] == SAFE_SQUARE) {
                return true
            }
    
            i = x + 1
            j = y
            if (i < grid.length && grid[i][j] == SAFE_SQUARE) return true
    
            i = x + 1
            j = y - 1
            if (i < grid.length && j >= 0 && grid[i][j] == SAFE_SQUARE) {
                return true
            }
    
            i = x
            j = y - 1
            if (j >= 0 && grid[i][j] == SAFE_SQUARE) return true

            return false
        }

        return [checkmate, check, stalemate, safesquare]
    }

}

console.log(amazonCheckmate('d3', 'e4'))
