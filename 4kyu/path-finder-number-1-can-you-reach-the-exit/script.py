# https://www.codewars.com/kata/path-finder-number-1-can-you-reach-the-exit

def path_finder(maze):
    grid = list(map(lambda x: list(x), maze.split('\n')))

    neighbors = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1],
    ]

    # [GOAL_ROW, GOAL_COL] = [len(grid) - 1, len(grid[0]) - 1]
    [GOAL_ROW, GOAL_COL] = [len(grid) - 1, len(grid[0]) - 1]

    node_stack = [[0, 0]]

    while len(node_stack) > 0:
        [cur_row, cur_col] = node_stack[0]

        if cur_row == GOAL_ROW and cur_col == GOAL_COL:
            return True

        grid[cur_row][cur_col] = ''

        for [n_row, n_col] in neighbors:
            next_row = cur_row + n_row
            next_col = cur_col + n_col

            if (next_row < 0 or next_col < 0 
                or next_row >= len(grid) or next_col >= len(grid[0])
                or grid[next_row][next_col] in ['W', '']):
                continue
            if [next_row, next_col] not in node_stack:
                node_stack.append([next_row, next_col])
        
        node_stack.pop(0)
    
    return False


# test = "\n".join([
#     ".W.",
#     ".W.",
#     "..."
# ])
test = "\n".join([
    "....W.W..W.......W...WW...WW.W......W.....W...WW..W..W.........W.WW....",
    "W..W.W..W.W..W.W....W..WWW......W..W..W.......W...........WW...W.W...W.",
    "W....W.WW...WW.WW.W...W..WW..W.........W.W...WW.....W.W...W.W.....WWW..",
    "....W.W.......W.WW.W....WW.W........W..W......W...WW..WW.W...W.W.W.....",
    "W.......WW....W.WW........WW.......WW.W.W..W.......WW........W.....WW..",
    "WW........W..W.......W.WW.......W..W.............WW......W..W..........",
    ".W.W.W..W.WWW.W.WWW..W.W.W.W..W......W..........WW.W....W.W.....W..W...",
    ".....WW..W..WWW.W.WW..W....W....W.........W......W..WW.......WW.W......",
    "..W...W...........WW..W.W.WW.W.....W..W.W.WW.W.W....W..WW..W.W.........",
    "...WW.W.............W.W.W....W....W..W.W..W..W...W..W........W...WWW..W",
    "....WWW.W..W....W......W........W..W..W...W.....W...W..WW......W.....W.",
    "W.W...W..W....W....W....WW......WWWWWWW.....WW....W...W..W...WWW.W.WW..",
    "..W..WW...WW.W...WWWW.W.....W.W........W...........W....WWWWW..WW..WW..",
    "WW..W.......W....WW.W......W....W.W......WW..W.WW...WW....W.WW.W.W..W..",
    "...W.WW.......W...WW.W.W.W...W...WWWW..W..W..WW......W..W....W..W...W..",
    "W....WW.W.W..W.W..W...W.W......W.WW.W.W...........W..WWW.....W....WW...",
    "..W......WW......W.........W.W.......W...WWW..WW.WW.W.W........WW...WW.",
    "...WW.......W..W.....W..........WW...WW...W......W.W...W...W..W...W....",
    ".......W..W.................W...W...WW......W...W..W....W.WW..W..WW.WWW",
    "W..W.W.WW.....W....W.....WW..W.....WWW......WWWW..W.WWW.....W.........W",
    "W.............W..W....W.........WWWWW...WWW.WW.WW......W....W..WWW.....",
    "...W....WW...WW....WW.WW....W.W.W.W..W.W..WWW..........W.WWW.WW.W.WWWW.",
    "W.W.....W...W...........W.W.W..WWWWW.WW.W........WWW...W.......W....W..",
    ".......W..WW...W....W.....W.WWW..W..W.W.W....W....WWWW..W..W..WWWW....W",
    ".W..WW.....W..W....WW..W.W.WW........WW......WW...W......WW.W........W.",
    ".W.WW..WW..W...........W....W..W...WW.....WW..WW.W.W......W....WW.W....",
    ".W.W..........W..W...........W.......W..WW..W.WW.......W......W..W..W.W",
    "..W.WW..W.....W..WW.....WW.WWW.W.W..........WWWW.......WWWW.....WW..W..",
    ".W..W...WWW.WWWW.WW...W...WW.W....W.....W..........W..WW.W...W..W....W.",
    "W...W...WW.........W..W..W....W.....W....W.WW..W..WW.W.......W.W.......",
    ".......WW.W.W..WW.......WWW.....W.W...WW..W..WW.WW.......W.W....WWW.W..",
    "W.W.W.W.W...W...W.W...WW....W.W...W..W..W....W.....W.W..W.....WW.......",
    "......WWW....W..W...........W.......W..W...WW...WW.........W.W.W..W...W",
    ".......................WW.WWWWWW.WW.W..W..W.....WW.W.W.W...W.W.W.W.....",
    "...WW.WW..........W......W.W..W..W...WWW.WW....W..WW....W...W..W.W..WW.",
    ".W.W...W.W...W..W...WW.W....W...W.WW...WWW.....W....W..WWWWW..WW.....W.",
    ".W.W.W.W....WW..........WW.....WW.W..W...W.WW.W.....WWW.......W.WW.....",
    ".WW...W..WW.W..W......W.W........W..WWW..W..............W.W.W....W.WW.W",
    "...WW.WWW...W.W......WW...W..W.......W.WWW..WW.....W...W...W..WWWW.....",
    "...W.WW...............................W.W.W.WW.W...W.......W.W.WWWWWWWW",
    "....WW.W.....W......W............W.WW..WWW...WW.W......W.......W.......",
    "WW.W..W......W.........WW...W........WW.W..W....W..W..WW....WW.........",
    ".W..WW..WWW........WW.W....W....WW.................W....W...W...W..W.WW",
    "W....W.......W.W...W......W......WWW.W...W....WW.W.WW.WW.WWW..W.W.W....",
    "....W..........W............W.W.........W...W.W.WWWW..W........WW....WW",
    "WWW........W......WW.....W.....W.WW..W......W.WWWW...W..WWW....WW...WW.",
    "...W.......WW.W......WW...W......W.........WW.W...W..W...WWW...W....W..",
    ".........W..WWW....W...........W..WW...W.WWWWW....WW...W......W........",
    "WW..W......W..W..............W.....W....WW.W...........W..W..W....W..W.",
    "...........W.WW.W......W.WWW..W.W............W...........WW...W...W..W.",
    "W..W.............WWW.W......W.W.....W...W.WWW....W.W..WW.W.....W..W.WW.",
    ".WW...WW....W..WWW..WW...W.WW.....W..WWW..W.W.W.W..W..WW.W...WWW..WW...",
    "W.W...W...W...W....W......WW.W.W.W.W..W.WW......W....W.....W..........W",
    ".....W.W.WW.........WWW.W.......W..WWWW.......W..WW.....W..W...W.....W.",
    "..W.W...W....WW........W.WW..WW........W.W.W......W.W..W.W...W.WW.W..W.",
    "W...W.W......W.....WW..W.WW...W.WW.............WW..W.........W.WW....W.",
    "...............W.W..WWW.WWW.W..W..WW...W...W.WWWW..W.W....WW..W......W.",
    ".W...W...W.W.W.....W.W......WWW.....W...WW.W..W.W.W.W.W..W..W.......W..",
    "......WW........WW.WW....W..W.WW.W.................WW.W..........W....W",
    ".WW.W.W...............W....W.....WWWW......W.W..WWW.WW.W.....W..W......",
    "...........W.......W.WW..W.WW..WW.....W.....W.W..WW....WW...WW.....W..W",
    "...W...W.WWWW.W...W......W....W.W.W....WWW.....W.W.W....W......W......W",
    "..W...W..W.......W.W..........W..........W.....W.W..........WW.....W.W.",
    "W....WW.W.W......W.....WWW.WW......WW.W....W.W....W.WW........W.W....W.",
    ".WW.....W......WWWW.W....W.WWW..W........W.....W.WW.....W.......W.W.W.W",
    "W.......W...W.WW.W......WWW.....WW....W..WWW.W....W.....W.........W....",
    "..WW.....W.W...WW.W..W..........W..W.WW.....W....W..WW........WW.W....W",
    "............W........WW......W.W.WWWW.....W.......W...W..W..W.W.W.....W",
    ".W.......W.WW.W.W......W....WW.W.WW.W.WW......W..............W.W...WWWW",
    "..........W.W...WW....W............W..............WW....WW.W....W...WW.",
    ".W.............WW...WW..W..WWW..WW...W......W..W.....W.......WW..WWW.W.",
])

ans = path_finder(test)

print(ans)
