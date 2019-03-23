# https://www.codewars.com/kata/digital-cypher/

def encode(message, key):
    letter_a = ord('a') - 1
    key_arr = [int(x) for x in list(str(key))]
    return [(ord(letter) - letter_a) + key_arr[i % len(key_arr)] for i, letter in enumerate(list(message))]

message = 'scout'
key = 1939

ans = encode(message, key)

print(ans)