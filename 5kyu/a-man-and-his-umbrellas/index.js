// http://www.codewars.com/kata/a-man-and-his-umbrellas

function minUmbrellas (weather) {
    let umbrellas = 0
    let rainyStates = [
        'rainy',
        'thunderstorms'
    ]
    let umbrellasAtHome = 0
    let umbrellasAtWork = 0

    for (const [index, value] of weather.entries()) {
        if (rainyStates.includes(value)) {
            if (index % 2 == 0) {
                if (umbrellasAtHome == 0) {
                    umbrellas++                    
                } else {
                    umbrellasAtHome--
                }
                umbrellasAtWork++
            } else {
                if (umbrellasAtWork == 0) {
                    umbrellas++
                } else {
                    umbrellasAtWork--
                }
                umbrellasAtHome++
            }
        }
    }

    return umbrellas
}

function main () {
    let tests = [
        ['cloudy'],
        ['rainy', 'rainy', 'rainy', 'rainy'],
        ['overcast', 'rainy', 'clear', 'thunderstorms']
    ]
    
    for (const [index, value] of tests.entries()) {
        
        console.log(index, value, minUmbrellas(value))
    }
}

main()