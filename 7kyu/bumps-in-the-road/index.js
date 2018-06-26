// http://www.codewars.com/kata/bumps-in-the-road/

const bump = x => {
    return [...x].filter(y => y === 'n').length <= 15
}
