// http://www.codewars.com/kata/lottery-ticket/train/javascript
function bingo(tickets, win){
    let miniwins = 0
    
    tickets.forEach(function (el) {
        let letters = [...el[0]]
        let number = el[1]
        for (let letter of letters) {
            if (letter.charCodeAt(0) === number) {
                miniwins++
                return
            }
        }
    })
    
    return (miniwins >= win) ? 'Winner!' : 'Loser!'  
}

// let tickets = [
//     ['GCWWPNW', 87],
//     ['LW', 80],
//     ['EXQFBL', 68],
// ]
// let win = 2

let tickets = [['ABC', 65], ['HGR', 74], ['BYHT', 74]]
let win = 1

let ans = bingo(tickets, win)
console.log(ans)


// GCWWPNW,87,LW,80,EXQFBL,68 and 2