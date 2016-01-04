export function check(graph) {
    for(let i = 0; i < graph.vertices.length; i++) {
        if (!checkConnectedVertices(graph, graph.vertices[i])) {
            return false;
        }
    }

    return true;
}

function checkConnectedVertices(graph, vertex) {
    var edges = graph.edges.filter(e => e[0] === vertex || e[1] === vertex);

    var vertexColor = getColor(graph, vertex);
    if (vertexColor === undefined) throw new Error("vertex not colored");

    for(let i = 0; i < edges.length; i++) {
        var edge = edges[i];

        if (edge[0] === edge[1] && edge[0] === vertex) {
            continue;
        }

        if (edge[0] === vertex) {
            if (getColor(graph, edge[1]) === vertexColor) {
                return false;
            }
        } else {
            if (getColor(graph, edge[0]) === vertexColor) {
                return false;
            }
        }
    }

    return true;
}

function getColor(graph, vertex) {
    return graph.colors[graph.vertices.indexOf(vertex)];
}
