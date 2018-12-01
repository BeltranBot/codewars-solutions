# https://www.codewars.com/kata/calculate-meal-total

def calculate_total(subtotal, tax, tip):
    total_tax = subtotal * (tax / 100)
    total_tip = subtotal * (tip / 100)
    return round(subtotal + total_tax + total_tip, 2)