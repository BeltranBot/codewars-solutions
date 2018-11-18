# https://www.codewars.com/kata/rot13/

def rot13(s):
    LOWER_A = ord('a')
    LOWER_Z = ord('z')

    def rot13_char(letter):
        letter_n = ord(letter.lower())
        letter_og = ord(letter)

        if letter_n >= LOWER_A and letter_n <= LOWER_Z:
            return (
                chr(letter_og + 13)
                if letter_n < LOWER_A + 13
                else chr(letter_og - 13)
            )
        
        return letter
    
    ans = ''

    for letter in s:
        ans += rot13_char(letter)
    
    return ans


test = 'EBG13 rknzcyr.'
ans = rot13(test)
print('ans', ans)
