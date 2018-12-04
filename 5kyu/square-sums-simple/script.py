def choose_one(so_far, nums, squares):
    #print(so_far, nums)
    if not nums:
        return so_far
    else:
        for n in nums:
            if not so_far or so_far[-1] + n in squares:
                n2 = nums[::]
                n2.remove(n)
                ans = choose_one(so_far + [n], n2, squares)
                if ans:
                    return ans


def square_sum(rmin=1, rmax=300):
    squares, i = set(), 1
    while i*i < rmax**2:
        squares.add(i*i)
        i += 1
    return choose_one([], list(range(rmin, rmax+1)), squares)


if __name__ == '__main__':
    print(square_sum())  # [8, 1, 15, 10, 6, 3, 13, 12, 4, 5, 11, 14, 2, 7, 9]
