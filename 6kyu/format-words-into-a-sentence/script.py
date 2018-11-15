# https://www.codewars.com/kata/format-words-into-a-sentence

def format_words(words):
    if not words or not len(words):
        return ''

    words = list(filter(lambda item: len(item) > 0, words))

    if not words or not len(words):
        return ''
    
    if len(words) == 1:
        return words[0]
    
    words = ', '.join(words)

    last_index = words.rfind(', ')

    return words[:last_index] + ' and ' + words[last_index + 2:]


# words = ['ninja', 'samurai', 'ronin']
words = ['one', 'two', 'three', 'four']
ans = format_words(words)

print(ans)
