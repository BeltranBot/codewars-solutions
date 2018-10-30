# https://www.codewars.com/kata/scramblies/


def scramble2(s1, s2):

    def hashString(s):
        obj = {}

        for i in s:
            if i in obj:
                obj[i] += 1
            else:
                obj[i] = 1

        return obj

    obj1 = hashString(s1)
    obj2 = hashString(s2)

    for i in obj2:
        if i in obj1 and obj1[i] >= obj2[i]:
            continue

        return False

    return True


def scramble(s1, s2):
    for i in s2:
        if s1.count(i) < s2.count(i):
            return False

    return True


ans = scramble('cedewaraaossoqqyt', 'codewars')

print('the answer is:', ans)
