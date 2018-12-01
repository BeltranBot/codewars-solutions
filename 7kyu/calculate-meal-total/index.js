// https://www.codewars.com/kata/calculate-meal-total

function calculate_total(subtotal, tax, tip) {
  let total_tax = subtotal * (tax / 100)
  let total_tip = subtotal * (tip / 100)
  return +(((subtotal + total_tax + total_tip) / 100) * 100).toFixed(2)
}