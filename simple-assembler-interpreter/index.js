// http://www.codewars.com/kata/simple-assembler-interpreter

function getValue(o, k) {
    return isNaN(k) ? o[k] : +k
}

function setValue (o, k, v) {
    if (!o[k]) {
        o[k] = getValue(o, v)
    } else if (isNaN(v)) {
        o[k] = o[v]
    } else {
        o[k] = +v
    }
}

function simple_assembler (program) {
    let o = {}

    for (let i = 0; i < program.length; i++) {
        let [ins, k, v] = program[i].split(' ')

        switch (ins) {
            case 'mov':
                setValue(o, k, v)
                break
            case 'inc':
                o[k]++
                break
            case 'dec':
                o[k]--
                break
            case 'jnz':
                if (getValue(o, k) != 0) {
                    i += getValue(o, v) - 1
                }
                break
        }
    }
	return o
}

// let ans = simple_assembler(['mov a 5','inc a','dec a','dec a','jnz a -1', 'inc a'])

let ans = simple_assembler(['mov a -10','mov b a','inc a','dec b','jnz a -2'])
console.log(ans)