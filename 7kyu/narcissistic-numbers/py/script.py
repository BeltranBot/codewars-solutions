# http://www.codewars.com/kata/narcissistic-numbers

def is_narcissistic(n):
    n_str = str(n)
    n_len = len(n_str)

    total = 0

    for number in list(n_str):
        total += int(number) ** n_len

    return n == total


n = 153
ans = is_narcissistic(n)

print('ans: %s' % str(ans))

