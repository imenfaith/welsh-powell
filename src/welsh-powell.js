// vertices = [a, b, c, d];
// edges = [[a,b],[c,d],[d,d]];
export function color({vertices = [], edges = [], colors = []}) {
    var graph = { vertices, edges, colors };
    graph.colors = new Array(graph.vertices.length);

    // color
    let valence = vertexValence(graph.vertices, graph.edges);
    let remaining = colorStep(graph, valence);
    while(remaining.length) {
        valence = vertexValence(remaining, graph.edges);
        remaining = colorStep(graph, valence);
    }

    return graph;
}

var nextColor = function(color = 0) { return () => color++; }();

function countEdges(valence, edges) {
    edges.forEach(e => {
        if(e[0] !== e[1]) {
            valence[e[0]]++;
            valence[e[1]]++;
        }
    });
}

function vertexValence(vertices, edges) {
    let valence = vertices.map(v => {v:0});
    countEdges(valence, edges);
    valence.sort((a, b) => a.value > b.value);
    return valence;
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

    [...connected].filter(x => getColor(graph, x)).length;
}

function colorStep(graph, valence) {
    let color = nextColor();

    // get index of first element
    let vertexIndex = getVertexIndex(graph, valence[0]);
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

    return graph.vertices.filter((x, i) => graph.colors[i]);
}





