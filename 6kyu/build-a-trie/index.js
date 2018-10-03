// http://www.codewars.com/kata/build-a-trie/

class Node {
    constructor (value = '', parent = null) {
        this.value = value
        this.children = []
        this.parent = parent
    }

    findChild (value) {
        for(let child of this.children) {
            if (child.value === value) return child
            let found = child.findChild(value)
            if (found) return found
        }

        return false
    }

    addChild (value, n = 0) {
        if (this.findChild(value)) return
        if (value.length === n) {
            this.push(new Node(value, this))
            return
        }
        let child = null

        if (value.length === 1) {
            this.children.push(child = new Node(value, this))
        } else {
            n++
            child = this.findChild(value.substr(0, n))

            if (!child) {
                child = new Node(value.substr(0, n), this)
                this.children.push(child)
            }
            if (n < value.length) {
                child.addChild(value, n)
            }
        }
    }

    getValues () {
        let obj = {}
        if (this.children.length === 0) return null
        for (let child of this.children) {
            obj[child.value] = child.getValues()
        }
        return obj
    }
}

function buildTrie(...words) {

    let arr = []
    for (let word of words) {
        let x = ''
        for (let letter of word) {
            x += letter
            if (!arr.includes(x)) {
                arr.push(x)
            }
        }
    }

    let root = new Node()

    for (let item of arr) {
        root.addChild(item)
    }

    return root.getValues()
}

let ans = buildTrie("A","to", "tea", "ted", "ten", "i", "in", "inn")

console.log('ans:', ans)