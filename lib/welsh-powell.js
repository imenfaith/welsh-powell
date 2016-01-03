"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.color = color;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// vertices = [a, b, c, d];
// edges = [[a,b],[c,d],[d,d]];
function color(_ref) {
    var _ref$vertices = _ref.vertices;
    var vertices = _ref$vertices === undefined ? [] : _ref$vertices;
    var _ref$edges = _ref.edges;
    var edges = _ref$edges === undefined ? [] : _ref$edges;
    var _ref$colors = _ref.colors;
    var colors = _ref$colors === undefined ? [] : _ref$colors;

    var graph = { vertices: vertices, edges: edges, colors: colors };
    graph.colors = new Array(graph.vertices.length);

    // color
    var valence = vertexValence(graph.vertices, graph.edges);
    var remaining = colorStep(graph, valence);
    while (remaining.length) {
        valence = vertexValence(remaining, graph.edges);
        remaining = colorStep(graph, valence);
    }

    return graph;
}

var nextColor = (function () {
    var color = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
    return function () {
        return color++;
    };
})();

function countEdges(valence, edges) {
    edges.forEach(function (e) {
        if (e[0] !== e[1]) {
            valence[e[0]]++;
            valence[e[1]]++;
        }
    });
}

function vertexValence(vertices, edges) {
    var valence = vertices.map(function (v) {
        v: 0;
    });
    countEdges(valence, graph);
    valence.sort(function (a, b) {
        return a.value > b.value;
    });
    return valence;
}

function getVertexIndex(graph, vertex) {
    return graph.vertices.findIndex(vertex);
}

function getColor(graph, vertex) {
    return graph.colors[getVertexIndex(vertex)];
}

function isConnectedToColoredVertex(graph, vertex) {
    var index = getVertexIndex(vertex);
    var connected = new Set();

    graph.edges.forEach(function (e) {
        if (e[0] === vertex) connected.add(e[1]);
        if (e[1] === vertex) connected.add(e[0]);
    });

    [].concat(_toConsumableArray(connected)).filter(function (x) {
        return getColor(graph, x);
    }).length;
}

function colorStep(graph, valence) {
    var color = nextColor();

    // get index of first element
    var vertexIndex = getVertexIndex(valence[0]);
    graph.colors[vertexIndex] = color;

    graph.vertices.forEach(function (x) {
        vertexIndex = getVertexIndex(x);
        // make sure not already colored
        if (!graph.colors[vertexIndex]) {
            // if it's not connected to a colored vertex
            if (!isConnectedToColoredVertex(graph, x)) {
                // color
                graph.colors[vertexIndex] = color;
            }
        }
    });

    return graph.vertices.filter(function (x, i) {
        return graph.colors[i];
    });
}