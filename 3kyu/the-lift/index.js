//

class Person {

    constructor (s, g) {
        this.starting_floor = s
        this.goal_floor = g
    }
}

class Queue {

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
        }
        return m
    }

    removePerson (i) {
        return this.queue[i].shift()
    }

    getHighestCall () {
        for (let i = this.queue.length - 1; i >= 0; i--) {
            if (this.queue[i].length > 0) {
                return (this.queue[i].goal_floor > i) ?
                    this.queue[i].goal_floor : i
            }
        }
        return 0
    }

    getLowestCall () {
        for (let i = 0; i < this.queue.length; i++) {
            if (this.queue[i].length > 0) return i
        }
        return 0
    }

}

class Lift {

    constructor (c, q) {
        this.current_floor = 0
        this.goal_floor = 0
        this.load = []
        this.capacity = c
        this.q = new Queue(q)
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
        this.load.slice(i, 1)
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
        while (this.q.queue[i].length > 0 && !this.isFull()) {
            if ((this.dir && this.q.queue[i][0].goal_floor > i) ||
                (!this.dir && this.q.queue[i][0].goal_floor < i)) {
                if (!stopped) stopped = true
                this.addPerson(this.q.removePerson(i))
            }
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



    goUp () {
        this.goal_floor = this.q.getHighestCall()
        this.dir = true
        for (let i = this.current_floor; i <= this.goal_floor; i++) {
            let a = this.unloadPeople(i)
            let b = this.loadPeople(i)
            if (a || b) this.stops.push(i)
        }
        this.current_floor = goal
        let g = this.q.getHighestGoal()
        this.goal_floor = g > this.goal_floor ? g : this.goal_floor
    }

    goDown () {
        let goal = this.q.getLowestCall()
        this.dir = false
        for (let i = this.current_floor; i >= goal; i--) {
            let a = this.unloadPeople(i)
            let b = this.loadPeople(i)
            if (a || b) this.stops.push(i)
        }
        this.current_floor = goal
        let g = this.q.getLowestGoal()
        this.goal_floor = g < this.goal_floor ? g : this.goal_floor
    }

    setGoal () {
        if (this.goal_floor == 0) {
            this.goal_floor = this.q.getHighestCall()
        } else if (this.dir) {
            let g = this.q.getHighestGoal()
            this.goal_floor = g > this.goal_floor ? g : this.goal_floor
        } else {
            this.goal_floor = this.q.getLowestCall()
        }
    }

}

function theLift (q, capacity) {
    let lift = new Lift(capacity, q)
    while (lift.q.count != 0) {
        lift.setGoal()
        lift.gotoGoal()
        console.log(lift.load)
        break
    }

    // if (lift.current_floor != 0) lift.push(0)

    return lift.stops    
}

var queues = [
    [], // G
    [], // 1
    [5,5,5], // 2
    [], // 3
    [], // 4
    [], // 5
    [], // 6
]

let result = theLift(queues, 5)
console.log(result)