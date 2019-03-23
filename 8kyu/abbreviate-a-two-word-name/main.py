# https://www.codewars.com/kata/abbreviate-a-two-word-name/

def abbrevName(name):
    return '.'.join(map(lambda x: x[0].upper(), name.split()))

ans = abbrevName("John Smith")


print(ans)