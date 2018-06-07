function floyd (n) {
    let numbers_per_level = 1
    let counter = 1

    for (let i = 0; i < n; i++) {
        let output = ''
        for (let j = 0; j < numbers_per_level; j++) {
            output += counter++ + ' '
        }
        console.log(output)
        numbers_per_level++
    }
}

floyd(100)