# https://www.codewars.com/kata/parseint-reloaded
from functools import reduce


def parse_int(string):

    VALUES = {
        'zero': 0,
        'one': 1,
        'two': 2,
        'three': 3,
        'four': 4,
        'five': 5,
        'six': 6,
        'seven': 7,
        'eight': 8,
        'nine': 9,
        'ten': 10,
        'eleven': 11,
        'twelve': 12,
        'thirteen': 13,
        'fourteen': 14,
        'fifteen': 15,
        'sixteen': 16,
        'seventeen': 17,
        'eighteen': 18,
        'nineteen': 19,
        'twenty': 20,
        'thirty': 30,
        'forty': 40,
        'fifty': 50,
        'sixty': 60,
        'seventy': 70,
        'eighty': 80,
        'ninety': 90,
        'hundred': 100,
        'thousand': 1000,
        'million': 1000000
    }

    MULTIPLIERS = ['hundred', 'thousand', 'million']

    arr = string.split(' ')
    ans = 0
    prev = 0
    prev_value = 'million'

    while len(arr):
        item = arr.pop(0)

        if item == 'and':
            continue

        if item in VALUES:
            if item in MULTIPLIERS:
                if VALUES[prev_value] < VALUES[item]:
                    ans = (ans + prev) * VALUES[item]
                else:
                    if not prev:
                        prev = ans
                        ans = 0

                    ans += prev * VALUES[item]

                prev = 0
                prev_value = item
            else:
                prev += VALUES[item]
        else:
            prev = ans + \
                reduce(lambda x, y: VALUES[x] + VALUES[y], item.split('-'))
            ans = 0

    return ans + prev


# ans = parse_int(
#     'seven hundred eighty-three thousand nine hundred and nineteen'
# )
ans = parse_int('two hundred three thousand')
print('answer:', ans)
