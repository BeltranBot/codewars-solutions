# # https://www.codewars.com/kata/digital-cypher-2/

def decode(code, key):
    letter_a = ord('a') - 1
    key_arr = [int(x) for x in list(str(key))]
    return ''.join([chr((x - key_arr[i % len(key_arr)]) + letter_a) for i, x in enumerate(code)])



code = [14, 10, 22, 29, 6, 27, 19, 18, 6, 12, 8]
key = 1939

ans = decode(code, key)

print(ans)