# https://www.codewars.com/kata/path-finder-number-2-shortest-path

NEIGHBORS = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
]

class Node():

    def __init__(self, row, col, value=None, previous=None):
        self.f = 0
        self.g = 0
        self.h = 0

        self.row = row
        self.col = col
        self.previous = previous
        self.value = value

    def is_wall(self):
        return self.value == 'W'


class Maze():

    def _generate_maze(self, grid):
        new_grid = []

        for row in range(0, len(grid)):
            grid_row = []

            for col in range(0, len(grid[row])):
                grid_row.append(Node(row, col, grid[row][col]))

            new_grid.append(grid_row)

        return new_grid

    def __init__(self, maze):
        self.grid = self._generate_maze(
            list(map(lambda x: list(x), maze.split('\n')))
        )

    def get_height(self):
        return len(self.grid)

    def get_width(self):
        return len(self.grid[0])

    def neighbour_exists(self, row, col):
        if (
            row >= 0 and col >= 0
            and row < self.get_height() and col < self.get_width()
        ):
            return True

        return False


def path_finder(m):

    def heuristic_manhattan(a, b):
        return abs(a.row - b.row) + abs(a.col - b.col)

    maze = Maze(m)

    start = maze.grid[0][0]
    end = maze.grid[maze.get_height() - 1][maze.get_width() - 1]

    open_set = set()
    open_set.add(start)
    closed_set = set()
    route = None

    while open_set:
        current = min(open_set, key=lambda x: x.f)

        if current == end:
            route = current
            break

        open_set.remove(current)
        closed_set.add(current)
        
        for [n_row, n_col] in NEIGHBORS:
            next_row = n_row + current.row
            next_col = n_col + current.col

            if not maze.neighbour_exists(next_row, next_col):
                continue

            neighbor = maze.grid[next_row][next_col]

            if neighbor in closed_set:
                continue
            if neighbor.is_wall():
                continue

            temp_g = current.g + 1
            new_path = False

            if neighbor in open_set:
                if temp_g < neighbor.g:
                    neighbor.g = temp_g
                    new_path = True
            else:
                neighbor.g = temp_g
                new_path = True
                open_set.add(neighbor)

            if new_path:
                neighbor.h = heuristic_manhattan(neighbor, end)
                neighbor.f = neighbor.g + neighbor.h
                # neighbor.previous = current
    return route.g if route else False


test1 = '\n'.join([
    ".W...",
    ".W...",
    ".W.W.",
    "...W.",
    "...W."
])

test2 = '\n'.join([
    '....W.W..W.......W...WW...WW.W......W.....W...WW..W..W.........W.WW....',
    'W..W.W..W.W..W.W....W..WWW......W..W..W.......W...........WW...W.W...W.',
    'W....W.WW...WW.WW.W...W..WW..W.........W.W...WW.....W.W...W.W.....WWW..',
    '....W.W.......W.WW.W....WW.W........W..W......W...WW..WW.W...W.W.W.....',
    'W.......WW....W.WW........WW.......WW.W.W..W.......WW........W.....WW..',
    'WW........W..W.......W.WW.......W..W.............WW......W..W..........',
    '.W.W.W..W.WWW.W.WWW..W.W.W.W..W......W..........WW.W....W.W.....W..W...',
    '.....WW..W..WWW.W.WW..W....W....W.........W......W..WW.......WW.W......',
    '..W...W...........WW..W.W.WW.W.....W..W.W.WW.W.W....W..WW..W.W.........',
    '...WW.W.............W.W.W....W....W..W.W..W..W...W..W........W...WWW..W',
    '....WWW.W..W....W......W........W..W..W...W.....W...W..WW......W.....W.',
    'W.W...W..W....W....W....WW......WWWWWWW.....WW....W...W..W...WWW.W.WW..',
    '..W..WW...WW.W...WWWW.W.....W.W........W...........W....WWWWW..WW..WW..',
    'WW..W.......W....WW.W......W....W.W......WW..W.WW...WW....W.WW.W.W..W..',
    '...W.WW.......W...WW.W.W.W...W...WWWW..W..W..WW......W..W....W..W...W..',
    'W....WW.W.W..W.W..W...W.W......W.WW.W.W...........W..WWW.....W....WW...',
    '..W......WW......W.........W.W.......W...WWW..WW.WW.W.W........WW...WW.',
    '...WW.......W..W.....W..........WW...WW...W......W.W...W...W..W...W....',
    '.......W..W.................W...W...WW......W...W..W....W.WW..W..WW.WWW',
    'W..W.W.WW.....W....W.....WW..W.....WWW......WWWW..W.WWW.....W.........W',
    'W.............W..W....W.........WWWWW...WWW.WW.WW......W....W..WWW.....',
    '...W....WW...WW....WW.WW....W.W.W.W..W.W..WWW..........W.WWW.WW.W.WWWW.',
    'W.W.....W...W...........W.W.W..WWWWW.WW.W........WWW...W.......W....W..',
    '.......W..WW...W....W.....W.WWW..W..W.W.W....W....WWWW..W..W..WWWW....W',
    '.W..WW.....W..W....WW..W.W.WW........WW......WW...W......WW.W........W.',
    '.W.WW..WW..W...........W....W..W...WW.....WW..WW.W.W......W....WW.W....',
    '.W.W..........W..W...........W.......W..WW..W.WW.......W......W..W..W.W',
    '..W.WW..W.....W..WW.....WW.WWW.W.W..........WWWW.......WWWW.....WW..W..',
    '.W..W...WWW.WWWW.WW...W...WW.W....W.....W..........W..WW.W...W..W....W.',
    'W...W...WW.........W..W..W....W.....W....W.WW..W..WW.W.......W.W.......',
    '.......WW.W.W..WW.......WWW.....W.W...WW..W..WW.WW.......W.W....WWW.W..',
    'W.W.W.W.W...W...W.W...WW....W.W...W..W..W....W.....W.W..W.....WW.......',
    '......WWW....W..W...........W.......W..W...WW...WW.........W.W.W..W...W',
    '.......................WW.WWWWWW.WW.W..W..W.....WW.W.W.W...W.W.W.W.....',
    '...WW.WW..........W......W.W..W..W...WWW.WW....W..WW....W...W..W.W..WW.',
    '.W.W...W.W...W..W...WW.W....W...W.WW...WWW.....W....W..WWWWW..WW.....W.',
    '.W.W.W.W....WW..........WW.....WW.W..W...W.WW.W.....WWW.......W.WW.....',
    '.WW...W..WW.W..W......W.W........W..WWW..W..............W.W.W....W.WW.W',
    '...WW.WWW...W.W......WW...W..W.......W.WWW..WW.....W...W...W..WWWW.....',
    '...W.WW...............................W.W.W.WW.W...W.......W.W.WWWWWWWW',
    '....WW.W.....W......W............W.WW..WWW...WW.W......W.......W.......',
    'WW.W..W......W.........WW...W........WW.W..W....W..W..WW....WW.........',
    '.W..WW..WWW........WW.W....W....WW.................W....W...W...W..W.WW',
    'W....W.......W.W...W......W......WWW.W...W....WW.W.WW.WW.WWW..W.W.W....',
    '....W..........W............W.W.........W...W.W.WWWW..W........WW....WW',
    'WWW........W......WW.....W.....W.WW..W......W.WWWW...W..WWW....WW...WW.',
    '...W.......WW.W......WW...W......W.........WW.W...W..W...WWW...W....W..',
    '.........W..WWW....W...........W..WW...W.WWWWW....WW...W......W........',
    'WW..W......W..W..............W.....W....WW.W...........W..W..W....W..W.',
    '...........W.WW.W......W.WWW..W.W............W...........WW...W...W..W.',
    'W..W.............WWW.W......W.W.....W...W.WWW....W.W..WW.W.....W..W.WW.',
    '.WW...WW....W..WWW..WW...W.WW.....W..WWW..W.W.W.W..W..WW.W...WWW..WW...',
    'W.W...W...W...W....W......WW.W.W.W.W..W.WW......W....W.....W..........W',
    '.....W.W.WW.........WWW.W.......W..WWWW.......W..WW.....W..W...W.....W.',
    '..W.W...W....WW........W.WW..WW........W.W.W......W.W..W.W...W.WW.W..W.',
    'W...W.W......W.....WW..W.WW...W.WW.............WW..W.........W.WW....W.',
    '...............W.W..WWW.WWW.W..W..WW...W...W.WWWW..W.W....WW..W......W.',
    '.W...W...W.W.W.....W.W......WWW.....W...WW.W..W.W.W.W.W..W..W.......W..',
    '......WW........WW.WW....W..W.WW.W.................WW.W..........W....W',
    '.WW.W.W...............W....W.....WWWW......W.W..WWW.WW.W.....W..W......',
    '...........W.......W.WW..W.WW..WW.....W.....W.W..WW....WW...WW.....W..W',
    '...W...W.WWWW.W...W......W....W.W.W....WWW.....W.W.W....W......W......W',
    '..W...W..W.......W.W..........W..........W.....W.W..........WW.....W.W.',
    'W....WW.W.W......W.....WWW.WW......WW.W....W.W....W.WW........W.W....W.',
    '.WW.....W......WWWW.W....W.WWW..W........W.....W.WW.....W.......W.W.W.W',
    'W.......W...W.WW.W......WWW.....WW....W..WWW.W....W.....W.........W....',
    '..WW.....W.W...WW.W..W..........W..W.WW.....W....W..WW........WW.W....W',
    '............W........WW......W.W.WWWW.....W.......W...W..W..W.W.W.....W',
    '.W.......W.WW.W.W......W....WW.W.WW.W.WW......W..............W.W...WWWW',
    '..........W.W...WW....W............W..............WW....WW.W....W...WW.',
    '.W.............WW...WW..W..WWW..WW...W......W..W.....W.......WW..WWW.W.',
])

test3 = '\n'.join([
    ".............W...WW.WW.......WW...W.W..W.............W.W....W...W..........WW...W...W...W.....W.W...",
    ".........W...W..W..W....W...W....W..................WW..W.WW.W..W..WW.......W....W......W..W.....W.W",
    "W.W.W......W..W...WWW.W.W....W.W......W......................W.....W.W.W...W..............W.....WW..",
    "W..............W.....WWW........WW...WW..WW.....WWW.W.....WWW.WW...W.......W....WW...W.W.W..........",
    "W.WWW....W.....W.....W....WW....WW..WWW.W..WWW.W.WW..W..........WW.W......W.W....W......WW...W.W.W.W",
    ".W.WW..W..W...W.................WW.W.WW.W.....W.....WW..W.....W..W.W..W..W....W.W...W..WW.....WWW...",
    "...W.....W...W..W......WW..W......W.......W.W....W...........W...W.......W..WWWW..W.W...W...W.W..W.W",
    "....W........WWW.WW......W..W.W..W..W..WW.......W...W.......W.WWWWW.....W.....WW..WW..W.W.WW.W.WWW..",
    ".....WW....WW..WW....WWW.....W...........W..........W....WW..W.W...W..WW...........W.....WWW........",
    "......WW.....W...........W..WW...W......W...W.WW..W.........WW....W.......WWW.........W...W.W.......",
    ".W.....W...W.....W........W....WW..........WW..W..W.WW......W...WWW...W........W.WW..........W.W....",
    "........W.WW.......W.....W....W..W..WWW.W........W.....WWW.W..WW.........WW......W....W..WWW..WWWW.W",
    "......W..W.W..W.W.W.W.W.WW....WW......WW.WW....WW..WWW...W......W..WW.WW.WWW......W..WW.......WW....",
    "W.W.WWW..................W.WW.W..W..W...................W....W.W.W...W.W....WW..W....WW......WWW....",
    "WWW..W..W........W..............W.W....W.W.W...W....W.......WW..WWWW....WW...W.W..W.W.W.W....WW.WW.W",
    ".........W........WWWW.W..W..WWW...W......W.........W...........W..W....W...WW.W.W.....W.W..........",
    "....WW.WW..W.W.....W....W...WWW.....WW...WW.......WW.....WW.W....W...W..W..WW.W..W...........W..W...",
    "......W.W........W..W......W....W.W...W....WW..W......W.WW.W...W.W.WWWW...W.......W....WW....WWW..W.",
    "........W..W...WWW..W..........WW...WWWWW......W...W...WW...W...W...W.W.....W...W...W..W..W...W..WW.",
    "W.W.WW.W.....W.........W....W..W.W..WW..............W.W............WW...WW...WWW....W.......W...W...",
    ".W..W..W.W....W....................WW...W....W.....W....W.W...W....W...W..W..W...W.....W.....W....W.",
    ".WW.WW..W.............W..W.....W..W...W...W..W..........W..W....W.........WW.W.....WW.....W..W......",
    "W.......W..WW......WW...W.W.W.......W.W.W.......WWW...W..............WW.....W.........W.......W....W",
    "..W........W...W..W........W.W.W.........W.W...WW.W...WW......W...W.WW.....WW...............WWW.W..W",
    ".W.....WW...W..W..........W.WWW..WWW...W...W...W....WW.W..W..W..W...W....WW.........W...W....W.W..WW",
    "..WW..W.....W.W.W..W.....W...W...WW...W........WWW....W..WW.WW.WW...W....W...W..............W.......",
    "W..W....W..W.....WW...W.WW..W....W..WW...WW.....W.....W.........W.......WWW.W.W..W...WWWWW....W.....",
    "..........W.....W.WWW.W......WW.W....W....WWW....W.WWWW..WWW..........W......WW.W..W...W......W.W...",
    "........W....W.......W....W....WWW...WWW..W......WWWW...W..W......WWW....W..WW..........W....W.W...W",
    "..W.W...W....W..W.W...W.....WW..W..........W..W.WW....WW..W.......W.W...W.W......W.....WW......WW...",
    "....WW.....W...WWW........W...W....W.....WW......W.......W..W..W...W...W..W....W.W.......W....W.W...",
    "WWW.....W.W..WW.............WW.W..W.....WW.W.W...W...WWW..W..W.........W..W.W..........WW..W.WW.....",
    "..W......WW...W..W..WW...W..W...W.W...WW..W.........W..W.....W.WW.....W........W..W..............W.W",
    "........W.W.W....W.....WW..WW..WW...WW...W..WW......W.W....W.WW.W..W..W.W........W.......W.W.W....W.",
    "..W....W.W.W..W.WW..W.......W.W..W.W.....W....W..WW..............W..W.W..W.........W....W.W.WW..W..W",
    "......W..........W.W.....W.W........WWW.W...W..............W...WWW..W.W.........W......W.W...W......",
    ".W.....W.W.............W...W..W..W.....W......W....W.WW.WW..WW..W...WW.....W.W...WW...........W..W.W",
    ".....W..W.W.W.....W..WWWW..W...W.W.......W.......W...WW..W.W.......W.W....W.....W.W.....W..WW.WW..WW",
    ".W.WW.......W.W...W.......WW...W..WWW......WWW..W.....W...W..W.W.....WW..W..W...W...W........W...W..",
    "....W.....W.......W....W.W...........W.WW....W..........W.....WW.....W.W.W.WW....W...W....WW........",
    ".......WW.......W...W.WW....WW.W..W...W.W...WW....WW..W....W...W......W..W..WW...W..WW...W...W......",
    "..WW..W.......W..WW.....W..WWW.....W.WW.....WW....W..W...W...W....W....W...W....WW..W.W....W..W.W..W",
    ".......W..WWWW..WW....W........W...W.W..WWWW.......W...W.WW.WW.W........W...W....W.WWW.W...........W",
    "W......W.WW..WW...WW...W..W.W...W.W.........W...........WW.......WWW..W..W.W..W........W....W.W..W..",
    "......WWW....WW....W....W........W....W...W.W......WW......................WW..W...W........W..W..WW",
    "W.....W.WWW..W..W.W...........W...WW.W..WW....W.....WW..W.W..WW.W....W.W.W......W..W.W......WW.....W",
    "......WW..WW.W.W......W.W.WW........WW.W.W..........W....W........WW.........WW.WW...........W..W...",
    "W..WWW.....WW.....W...W.W.......W..WW....W...WW......WW..W.............W..W..W..WW.W.W......W...WWWW",
    "W.W..W..W....W....WW...W..WWW...W.......WW...W......WWW..W....W....W.W...W.WW.....W...W.....WW......",
    "....W........W.........WW...W....WW...W.WWWW..W.W...W...W..........W.....W.....W...WW....WW.WW......",
    ".........W....WW...W.WWWW.WW................W........W......W.W.WWW.W.......W.W.W.W....W.........WWW",
    "W......WW..WWW.......W......W......W........WW.......W..........................WW....W...WW..W..WW.",
    "W....WWW.WWW....W........W...W.....W....W..........WW.WW.....WW.WW.WW...W.W....WW.......W......W.WW.",
    "...W.....W.W.W...WW......WW...WW.....W..W....WW.......W.......W...W.....W..W.....W.WW.WW.WW......WW.",
    ".W..........W.W..WWW...W.......................W..W..WW....W.W.W..WW........WW.............W...W.W..",
    ".WW..W...W......W....W...WW.....W.......W.W..W.....WW...W.W...W..W.WW.....WW..........W........W....",
    "W.WW..WW....W....W..W...W.......W.W...W...W...WW.WW......WWW.....W.W...WW.....WWWW..W.W....W...W....",
    ".W.W...............W......WW...WW.....WWWW......W...W...W..W..W..WW...W........W.........W..........",
    ".W.......WW..WW.WWWW....W..W.WW.W.W....W....W......W..W....WW....W.W.W.W.W......W.W.WW.W..W..W.W....",
    "W.....W...W..W...W...W.W...WWW......W..WW...W..W.........W..W......W....W....WW.....W........W..W.W.",
    "...W.....WW.WWW....W..W.W....WW..W.....W.W.W...W.W..W....W.W.W......W.W.....W.W........W...W.W......",
    "W...W.W..W.W........W.....W.W.....W.WWWW......W...W.....WWWW..W..........W.W..W.W.W.WW.W.....W......",
    ".......W..........WW...W.......W..W..W..W.........W..WW.WW..................WW.........WW..W......W.",
    ".WW...W.....WW..W.W......W...WW.W.W.W.............WW..W....W...WWW......W...WW.......WW..W.W.WW.....",
    "WWW..WW.........W..WW.W......W....W..WW...W.W..W...W......WW.........W.......................WW....W",
    ".W..W........WW...W.....W......WW...W.W...WW.W..........WWW.W..W............W.........W..W.W.W..W...",
    ".W.W.......W...WW.W..W...W......W.W........W......W.W...W.W..........W.W..W.....W..WW.W...W.W.W....W",
    ".WWW.W.W......WW.........WW..W......WW..W.WW.W.W..W..W..W.WW...W...........W.....W.W......W.....W...",
    ".........WW.....W...W.W............WWW..W.......W.......WW......WWW.W...WWW..W..WW.W..........W.....",
    "WW....W.....WWW.W...WW.W...............W..W.........W.W.W.......WWW.WWW.......W.....W.W.WWW.WW...W..",
    "...W....W..W.W.W.WWW..W..W..W..W.W...WWW..........WW.W.W.....WWW..WW.....W.WWW...W...W..W.W..W....WW",
    "..W.....WWW............WW........W..W.....W.W....W..W..WWW.W..W.......W.....W.W........W....W.......",
    "......W..............W...W....WW......W...WWWW...W..........W..W.WW.W....WW..W.....W.W....W.....WW..",
    "......WWW...WW........W.W..........W...WW.....W.....W...W..W....W..W..WWWW.WW...WW......W...WWWW...W",
    "W..W.....W.WWW....WW.....W....W..........WW.W..WW.......W........W.WW...W.....W.....W...WW...WW....W",
    "............WW..W.W...WW.W....WWW....W....W.....W.W..W.W........W.....W..W.W....W....WW.............",
    ".W..W......W..WW.WWWW.W....WWW...W.....WW.........W....W.........WW....W.W..............W......W.W..",
    ".......WWW..W.W..W..W....W..W..W..W..WWWWW.W.....W...W.....W.WW....WW.W....WW..W......WWW.....W...W.",
    ".W.W...W.WW....WWW.......W.W....W.................W......WW.WW..W.WW...WWWW..W..WW.W..W.W...........",
    "....WWW...W.....W.......WW..W....................W....W..WW..W.W..W.W..W..W.WW..W...W..W..W..W......",
    ".....W...WW.....W.W..W.....WWW......WW..W...W....W.W..W.W.W....W....W.....W..W.......W.........W....",
    ".....W................W.W...WW.WW.W.WW..WW......W.W.....W....W..W..W...W.....WWW..WWW.W.W..WW.W.W...",
    "W.....W.....W.WW..W..W.W..W.......W..W...WW....W.........WW...W.W..W.W....W...WW.....W.W..W..WW..W..",
    "...W...........WW.........WW..W.......W..W.....W.....WW.....W......W.....W..W.W.......W..WW.W....W..",
    "W.......W.W.W..........W.W.W..W.W......W.WW.....WWW..W..W....WWW...W.W.WW....W...W.W.........WWW..W.",
    "W......W..W...WWWW....W......W..WW....W..................W.....WW.W...W..W...W..WWW......W....W.W.WW",
    "..W.W.W.WW.W.WW.WW.....WW....W..W..W...W......W......W.WW....W..W......W.W..W..W......W...WW..W.W...",
    ".WW........W......W......W.W..W.....WW...W.....WW.....W........W.W...WW.....W..........WW.W.......W.",
    "....WW.W..W...W.WW...W......W.W.W...W.W.W...WW.W.......W..W...W.W.....W......W...W..WW...WWW..W.W...",
    "WWWW.W.....W.W.W..W.....W.....W....WW..W.....WW...W.W.......W.........WW.W..W....W......W...W.W.W.W.",
    "............WW..W...W....WW......W...W.W.W....W...WW...W..WWW..W......W....WW...W..WW....WWW..WW.W..",
    "W..........W...W............W...W.....W...WW.....WW...W.WW.....W..W..WW.W.W.W...WW.W.W...WW...W....W",
    "W...W.W..................W..W..W....W....W....W...W.......W...W..W.W.WWWW.W.W..WW.....WWW...W....W..",
    "W.WW......................W..W.....W...W.W..W.......WW.........WWWWWW........W....W...W.W.....W.....",
    ".W..WWW.WW....WW.........W.W..WW.W...W......W.W.W....W.W..W.....W.WW......WW.........WWW...........W",
    "W...WW...W..W...W.W...WWW......WW...W......WW.............W....W..W...........W....W.W.....WW.W...W.",
    "...W.....W.W..W..W...W.W....WW.W.......W.W.......W....W....W.W...W...W..W........W..WW.WW..W....W.WW",
    "W.....WW....W..WW.....WW..W.WW.W...W..WW...W....WWW......W.WW............W..W.W........W..W..W.W..W.",
    ".....W.W..W....W...WW..W......W..WW..W...........W......W.WW.WW..W......W..W.WW.........W...W.W..W..",
    ".W.....W..W.W...WW..WW.......W.WW..........W....W..W....W..WW....WW..W.WW.......W...W...W....W....W.",
])

ans = path_finder(test3)
print 'solution:', ans, len(test3)
