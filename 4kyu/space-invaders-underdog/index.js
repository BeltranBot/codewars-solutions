// http://www.codewars.com/kata/space-invaders-underdog
const colors = require('colors/safe')

class Alien {

    constructor (x, y, speed) {
        this.x = x
        this.y = y
        this.speed = speed
    }

    nextPosition (w) {
        let speed = this.speed
        if (this.y != 0 || this.y != (w - 1)) {
            if (speed < 0) {
                if (Math.abs(speed) > this.y) {
                    speed += this.y
                } else {
                    return [this.x, this.y + speed, speed]
                }
            } else if (speed > 0) {
                if (speed + this.y > w - 1) {
                    speed -= w - 1 - this.y
                } else {
                    return [this.x, this.y + speed, speed]
                }
            }
        }

        let x = Math.ceil(Math.abs(speed) / w)
        let even = x % 2 == 0
        speed = Math.abs(speed) % w
        let y = this.y

        if (this.speed < 0 && even || this.speed > 0 && !even) {
            y = w - speed
        } else if (this.speed < 0 && !even || this.speed > 0 && even) {
            y = speed - 1
        }
        return [x + this.x, y, even ? this.speed : -1 * this.speed]
    }

}

class Square {

    constructor (x, y) {
        this.x = x
        this.y = y
        this.aliens = []
    }

    addAlien (speed) {
        this.aliens.push(new Alien(this.x, this.y, speed))
    }

    isEmpty () {
        return this.aliens.length == 0
    }

    removeAlien (i) {
        this.aliens.splice(i, 1)
    }

    sortAliens () {
        this.aliens.sort((a,  b) => {
            if (Math.abs(a.speed) > Math.abs(b.speed)) {
                return 1
            } else if (Math.abs(a.speed) < Math.abs(b.speed)) {
                return -1
            }
            return (a.speed >= b.speed) ? 1 : (a.speed == b.speed) ? 0 : -1
        })
    }

}

class Grid {

    constructor (h, w, a = []) {
        this.w = w
        this.h = h
        this.aliens = 0
        this.matrix = this.initializeMatrix(h, w, a)
    }

    addAlien () {
        this.aliens++
    }

    removeAlien () {
        this.aliens--
    }

    initializeMatrix (h, w, a = []) {
        let matrix = new Array(h)
        for (let i = 0; i < matrix.length; i++) {
            matrix[i] = new Array(w)
            for (let j = 0; j < matrix[i].length; j++) {
                matrix[i][j] = new Square(i, j)
                if (a[i] && a[i][j] && a[i][j] != 0) {
                    matrix[i][j].addAlien(a[i][j])
                    this.addAlien()
                }
            }            
        }
        return matrix
    }

    step () {
        let grid = new Grid (this.matrix.length, this.matrix[0].length)
        for (let i = 0; i < this.matrix.length; i++) {
            for (let j = 0; j < this.matrix[0].length; j++) {
                if (!this.matrix[i][j].isEmpty()) {
                    for (let alien of this.matrix[i][j].aliens) {
                        let [x, y, speed] = alien.nextPosition(this.w)
                        if (x >= this.h) return null
                        grid.matrix[x][y].addAlien(speed)
                        grid.addAlien()
                    }
                }
            }
        }
        return grid
    }

    print () {
        let output = []
        for (let i = 0; i < this.matrix.length; i++) {
            output.push([])
            for (let j = 0; j < this.matrix[0].length; j++) {
                output[i].push (
                    (this.matrix[i][j].aliens.length > 0) ?
                    this.matrix[i][j].aliens[0].speed : 0
                )
            }
        }
        console.log(output)
        console.log()
    }

    printColors () {
        for (let i = 0; i < this.matrix.length; i++) {
            let output = ''
            for (let j = 0; j < this.matrix[i].length; j++) {
                if (this.matrix[i][j].isEmpty()) {
                    output += colors.white(0)
                } else if (this.matrix[i][j].aliens.length == 1) {
                    let s = this.matrix[i][j].aliens[0].speed
                    output += (s < 0) ?
                        colors.red(Math.abs(s)) :
                        colors.cyan(Math.abs(s))
                } else {
                    this.matrix[i][j].sortAliens()
                    let s = this.matrix[i][j].aliens[this.matrix[i][j].aliens.length - 1].speed
                    output += (s < 0) ?
                        colors.grey(Math.abs(s)) :
                        colors.green(Math.abs(s))
                }
                output += ' '
            }            
            console.log(output)
        }
        console.log()
    }

    checkCollision (p) {
        for (let i = this.matrix.length - 2; i >= 0; i--) {
            let square = this.matrix[i][p[1]]
            if (square.isEmpty()) continue
            if (square.aliens.length == 1) {
                square.removeAlien(0)
                this.removeAlien()
                return true
            }
            square.sortAliens()
            square.removeAlien(square.aliens.length - 1)
            this.removeAlien()
            return true
        }
        return false
    }

    countAliens () {
        return this.aliens
    }

}

function blastSequence (aliens, position) {
    let height = aliens.length > position[0] + 1 ?
        aliens.length : position[0] + 1
    let width = aliens[0].length > position[1] + 1 ?
        aliens[0].length : position[1] + 1
    let grid = new Grid(height, width, aliens)
    let i = 0
    let shots = []
    while (true) {
        grid = grid.step()
        if (grid) {
            // grid.printColors()
            if (grid.checkCollision(position)) shots.push(i)
            if (grid.countAliens() == 0) return shots
        } else {
            return null
        }
        i++
    }
}

// const alienWave = [[3, 1, 2, -2, 2, 3, 6, -3, 7, 1]];
// const position = [6, 4];

const alienWave = [
    [ -9, 8, -7, 6, -5, 4, -3, 2, -1, 1, -2, 3, -4, 5, -6, 7, -8, 9, 10 ]
]
const position = [ 10, 6 ]

let ans = blastSequence(alienWave, position)
console.log(ans)