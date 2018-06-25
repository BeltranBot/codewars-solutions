// http://www.codewars.com/kata/challenge-fun-number-14-target-game/

function targetGame (vals) {
    incl = 0
    excl = 0
    
    for (const val of vals) {
        new_excl = excl > incl ? excl : incl

        incl = excl + val
        excl = new_excl
    }

    return excl > incl ? excl : incl
}

// let values = [5,  5, 10, 40, 50, 35]
// let values = [36, 42, 93, 29, 0, 33, 15, 84, 14, 24, 81, 11]
let values = [5, -2, -9, -4]

console.log(targetGame(values))
