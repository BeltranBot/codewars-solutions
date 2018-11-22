# https://www.codewars.com/kata/highest-and-lowest/train/javascript

def high_and_low(numbers):
    numbers = list(map(lambda x: int(x), numbers.split()))
    return "%s %s" % (max(numbers), min(numbers))


numbers = "4 5 29 54 4 0 -214 542 -64 1 -3 6 -6"

ans = high_and_low(numbers)

print(ans)
