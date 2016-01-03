var nextColorProvider = function(color = 0) { return () => color++; };

// vertices = [a, b, c, d];
// edges = [[a,b],[c,d],[d,d]];
export function color({vertices = [], edges = [], colors = []}) {
    let nextColor = nextColorProvider();
    let graph = { vertices, edges, colors, nextColor };
    graph.colors = new Array(graph.vertices.length);

    // color
    let remaining = colorStep(graph);
    while(remaining.length) {
        remaining = colorStep(graph, remaining);
    }

    return graph;
}


function countEdges(valence, edges) {
    edges.forEach(e => {
        if(e[0] !== e[1]) {
            valence[e[0]]++;
            valence[e[1]]++;
        }
    });
}

function maxValence(vertices, edges) {
    let valence = new Object;
    vertices.forEach(v => valence[v] = 0);
    countEdges(valence, edges);

    // swapping key value
    let valueSwapped = new Object;
    Object.keys(valence).forEach(k => {
        valueSwapped[valence[k]] = k;
    });

    let max = Object.keys(valueSwapped).sort()[0];
    return valueSwapped[max];
}

function getVertexIndex(graph, vertex) {
    return graph.vertices.indexOf(vertex);
}

function getColor(graph, vertex) {
    return graph.colors[getVertexIndex(graph, vertex)];
}

function isConnectedToColoredVertex(graph, vertex) {
    let index = getVertexIndex(graph, vertex);
    let connected = new Set;

    graph.edges.forEach((e) => {
        if (e[0] === vertex) connected.add(e[1]);
        if (e[1] === vertex) connected.add(e[0]);
    });

    return [...connected].filter(x => getColor(graph, x) !== undefined).length;
}

function colorStep(graph, remaining = graph.vertices) {
    let color = graph.nextColor();
    let maxVertex = maxValence(remaining, graph.edges);

    // get index of first element
    let vertexIndex = getVertexIndex(graph, maxVertex);
    graph.colors[vertexIndex] = color;

    graph.vertices.forEach(x => {
        vertexIndex = getVertexIndex(graph, x);
        // make sure not already colored
        if(!graph.colors[vertexIndex]) {
            // if it's not connected to a colored vertex
            if(!isConnectedToColoredVertex(graph, x)) {
                // color
                graph.colors[vertexIndex] = color;
            }
        }
    });

    var remaining = graph.vertices.filter((x, i) => graph.colors[i] === undefined);
    return remaining;
}





