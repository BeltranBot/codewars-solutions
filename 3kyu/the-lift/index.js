// http://www.codewars.com/kata/the-lift/

class Person {

    constructor (s, g) {
        this.starting_floor = s
        this.goal_floor = g
    }
}

class Q {

    constructor (q) {
        this.count = 0
        this.queue = this.initializeQueue(q)
    }

    initializeQueue (q) {
        let m = new Array(q.length)
        for (let i = 0; i < q.length; i++) {
            m[i] = []
            for (let j = 0; j < q[i].length; j++) {
                let p = new Person(i, q[i][j])
                m[i].push(p)
                this.count++
            }
            m[i].reverse()
        }
        return m
    }

    length () {
        return this.queue.length - 1
    }

    removePerson (i, j) {
        let a = this.queue[i].splice(j, 1)[0]
        return a
    }

}

class L {

    constructor (c, q) {
        this.current_floor = 0
        this.goal_floor = 0
        this.load = []
        this.capacity = c
        this.q = new Q(q)
        this.stops = [0]
        this.dir = false
    }

    isFull () {
        return this.load.length >= this.capacity
    }

    addPerson (p) {
        this.load.push(p)
    }

    removePerson (i) {
        this.load.splice(i, 1)
        this.q.count--
    }

    unloadPeople (i) {
        if (this.load.length == 0) return false
        let stopped = false
        for (let j = this.load.length - 1; j >= 0; j--) {
            if (this.load[j].goal_floor == i) {
                if (!stopped) stopped = true
                this.removePerson(j)
            }
        }
        return stopped
    }

    loadPeople (i) {
        let stopped = false
        for (let j = this.q.queue[i].length - 1; j >= 0; j--) {
            let a = (this.dir && this.q.queue[i][j].goal_floor > i)
            let b = (!this.dir && this.q.queue[i][j].goal_floor < i)
            if (!stopped && (a || b)) stopped = true
            let c = !this.isFull()
            if ((a || b) && c) this.addPerson(this.q.removePerson(i, j))
        }
        return stopped
    }

    getHighestGoal () {
        if (this.load.length == 0) return 0
        let max = -1
        for (let i = 0; i < load.length; i++) {
            max = load[i] > max ? load[i] : max
        }
        return max
    }

    getLowestGoal () {
        if (this.load.length == 0) return 0
        let min = Infinity
        for (let i = 0; i < load.length; i++) {
            min = load[i] < min ? load[i] : min
        }
        return min
    }

    addStop (i) {
        let last = this.stops.length - 1
        if (this.stops[last] == i) return
        this.stops.push(i)
    }

    goUp () {
        this.goal_floor = this.q.length()
        this.dir = true
        for (let i = this.current_floor; i <= this.goal_floor; i++) {
            let a = this.unloadPeople(i)
            let b = this.loadPeople(i)
            if ((a || b)) this.addStop(i)
        }
        this.current_floor = this.goal_floor
    }

    goDown () {
        this.goal_floor = 0
        this.dir = false
        for (let i = this.current_floor; i >= this.goal_floor; i--) {
            let a = this.unloadPeople(i)
            let b = this.loadPeople(i)
            if ((a || b)) this.addStop(i)
        }
        this.current_floor = this.goal_floor
    }

}

function theLift (q, capacity) {
    let lift = new L(capacity, q)
    while (lift.q.count != 0) {
        if (lift.dir) {
            lift.goDown()
        } else {
            lift.goUp()
        }
    }

    if (lift.stops[lift.stops.length - 1] != 0) lift.stops.push(0)

    return lift.stops
}

let queues = [
    [ 1, 1, 2 ],  // g
    [ 0, 0, 0, 0 ], // 1
    [ 1, 3 ],  // 2
    [ 2, 1, 2, 0 ] // 3
]

let result = theLift(queues, 2)
console.log(result)