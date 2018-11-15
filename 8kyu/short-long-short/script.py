# https://www.codewars.com/kata/short-long-short/train/python


def solution(a, b):
    if len(a) > len(b):
        return b + a + b
    else:
        return a + b + a

