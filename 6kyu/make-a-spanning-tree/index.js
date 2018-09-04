// http://www.codewars.com/kata/make-a-spanning-tree/

function removeFromEdges (edges, [a, b]) {
    for (let i = edges.length - 1; i >= 0; i--) {
        let [[...edge], w] = edges[i]

        if (edge.indexOf(a) != -1 && edge.indexOf(b) != -1) {
            edges.splice(i, 1)
        }
    }
}

function getEdge (edges, t, nodes) {
    let val = t == 'min' ? Infinity : -Infinity
    let edge = ['', val]

    for (let [[a, b], w] of edges) {
        if (a == b) continue
        if (Object.keys(nodes).length == 0 || (nodes[a] != nodes[b])) {
            let condition = t == 'min' ? edge[1] < w : edge[1] > w
            edge = condition ? edge : [[a, b], w]
        }
    }
    return edge
}

function makeSpanningTree (e, t) {
    let edges = e.slice(0)
    let visitedNodes = {}
    let choosenEdges = []
    while (edges.length > 0) {
        let edge = getEdge(edges, t, visitedNodes)
        if (Math.abs(edge[1]) == Infinity) break

        removeFromEdges(edges, edge[0])
        
        visitedNodes[edge[0][0]] = true
        visitedNodes[edge[0][1]] = true
        choosenEdges.push([edge[0].join('') , edge[1]])
    }

    return choosenEdges
}

let edges = [
    ['AB', 1], ['AE', 1], ['BA', 1], ['EA', 1], ['GH', 1], ['HG', 1], ['AF', 2], ['DE', 2],
    ['DH', 2], ['ED', 2], ['FG', 2], ['FA', 2], ['GF', 2], ['HD', 2], ['BE', 3], ['CD', 3],
    ['DC', 3], ['EB', 3], ['DG', 4], ['EF', 4], ['FE', 4], ['GD', 4], ['AH', 5], ['BF', 5],
    ['FB', 5], ['HA', 5], ['BC', 6], ['CB', 6], ['CH', 7], ['HC', 7], ['CG', 8], ['GC', 8]
]

let type = 'min'

let ans = makeSpanningTree(edges, type)

console.log(ans)