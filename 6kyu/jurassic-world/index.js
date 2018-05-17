class JurassicWord {
    constructor () {
        this.food = {
            deadDino: {
                mark: '_C     C}>',
                text: 'is eating a dead dino.',
                allowed: ['tRex', 'velociraptor']
            },
            flowers: {
                mark: 'iii     iii',
                text: 'is eating flowers.',
                allowed: ['brachiosaurus', 'triceratops']
            },
            leaves: {
                mark: '|||     |||',
                text: 'is eating leaves.',
                allowed: ['brachiosaurus']
            }
        }
        this.dinosaurs = {
            tRex: {
                bite: "VvvvV",
                text: 'A T-Rex'
            },
            velociraptor: {
                bite: "vvvvv",
                text: 'A velociraptor'
            },
            brachiosaurus: {
                bite: "uuuuu",
                text: 'A brachiosaurus'
            },
            triceratops: {
                bite: "uuVuu",
                text: 'A triceratops'
            }
        }
    }

    lunchTime (scene) {
        let dino = null
        let food = null
        let w1 = null
        let w2 = null

        for (let f in this.food) {
            let w = this.food[f].mark.split('     ')
            w1 = w[0]
            w2 = w[1]
            let len1 = w1.length
            let len2 = w2.length
            if (w1 === scene.substr(0, len1) && w2 === scene.substr(scene.length - len2, len2)) {
                food = f
                break
            }
        }

        if (!food) w1 = '...'

        for (const d in this.dinosaurs) {
            if (scene.substr(w1.length, 5).indexOf(this.dinosaurs[d].bite) !== -1) {
                dino = d
                break
            }
        }

        if (!dino) {
            if (!food) {
                return 'Something is eating something.'
            }
            return 'Something ' + this.food[food].text
        } else {
            if (!food) {
                return this.dinosaurs[dino].text + ' is eating something.'
            }
        }

        if (this.food[food].allowed.includes(dino)) {
            return this.dinosaurs[dino].text + ' ' + this.food[food].text
        } else {
            return 'Something ' + this.food[food].text
        }
    }
}

let jw = new JurassicWord()
// let ans = jw.lunchTime("_CVvvvVC}>")
// let ans = jw.lunchTime("iiiuuVuuiii")
let ans = jw.lunchTime("uVuuVuuVuuu")
console.log('answer', ans)