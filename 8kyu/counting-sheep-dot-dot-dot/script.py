# https://www.codewars.com/kata/counting-sheep-dot-dot-dot/
def count_sheeps(arrayOfSheeps):
  return len(list(filter(lambda x: x, arrayOfSheeps)))