// https://www.codewars.com/kata/the-pony-express

function riders(stations) {
    let riders = 1
    stations.reduce((a, c) => (a + c) > 100 ? (riders++, c) : a + c, 0)
    return riders
}