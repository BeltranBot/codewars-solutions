# https://www.codewars.com/kata/find-the-unique-number-1

def find_uniq(arr):
    obj = {}

    for num in arr:
        if num in obj:
            obj[num] += 1
        else:
            obj[num] = 1

    for key in obj:
        if obj[key] == 1:
            return key
    
    return None

numbers = [ 0, 0, 0.55, 0, 0 ]

ans = find_uniq(numbers)

print(ans)