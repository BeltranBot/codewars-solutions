// https://www.codewars.com/kata/pizza-payments
function michaelPays(costs) {
    if (costs < 5) {
        return +costs.toFixed(2)
    } else {
        let kate = (costs / 3)
        if (kate <= 10) {
            return +(costs - kate).toFixed(2)
        }    
        return +(costs - 10).toFixed(2)
    }
}