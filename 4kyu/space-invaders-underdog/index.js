// http://www.codewars.com/kata/space-invaders-underdog

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
                    // console.log('uno')
                    return [this.x, this.y + speed, speed]
                }
            } else if (speed > 0) {
                if (speed + this.y > w - 1) {
                    speed -= w - 1 - this.y
                } else {
                    // console.log('dos')
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
            // console.log('tres')
        } else if (this.speed < 0 && !even || this.speed > 0 && even) {
            // console.log('cuatro')
            y = speed - 1
        }
        return [x + this.x, y, (even) ? this.speed : -1 * this.speed]
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

}

class Grid {

    constructor (h, w, a = []) {
        this.w = w
        this.matrix = this.initializeMatrix(h, w, a)
    }

    initializeMatrix (h, w, a = []) {
        let matrix = new Array(h)
        for (let i = 0; i < matrix.length; i++) {
            matrix[i] = new Array(w)
            for (let j = 0; j < matrix[i].length; j++) {
                matrix[i][j] = new Square(i, j)
                if (a[i] && a[i][j]) {
                    matrix[i][j].addAlien(a[i][j])
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
                        grid.matrix[x][y].addAlien(speed)
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

}

function blastSequence (aliens, position) {
    let height = aliens.length > position[0] + 1 ?
        aliens.length : position[0] + 1
    let width = aliens[0].length > position[1] + 1 ?
        aliens[0].length : position[1] + 1
    
    // let grid = new Grid(length, width, aliens)
    // let alien = new Alien(0, 8, 7)
    // let alien = new Alien(0, 6, 6)
    // let alien = new Alien(0, 2, 2)
    // let alien = new Alien(0, 3, -2)
    // let alien = new Alien(0, 3, -30)
    // console.log(alien.nextPosition(width))
    let grid = new Grid(height, width, aliens)
    grid.print()
    let arr = [grid]

    for (let i = 0; i < 5; i++) {
        arr.push(arr[arr.length - 1].step())
        arr[arr.length - 1].print()
    }

    // let alien = new Alien(1, 4, -7)
    // console.log(alien.nextPosition(width))

}

const alienWave = [[3, 1, 2, -2, 2, 3, 6, -3, 7, 1]];
const position = [6, 4];

blastSequence(alienWave, position)