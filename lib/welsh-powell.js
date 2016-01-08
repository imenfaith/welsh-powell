"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.color = color;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var nextColorProvider = function nextColorProvider() {
    var color = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
    return function () {
        return color++;
    };
};

// vertices = [a, b, c, d];
// edges = [[a,b],[c,d],[d,d]];
function color(_ref) {
    var _ref$vertices = _ref.vertices;
    var vertices = _ref$vertices === undefined ? [] : _ref$vertices;
    var _ref$edges = _ref.edges;
    var edges = _ref$edges === undefined ? [] : _ref$edges;
    var _ref$colors = _ref.colors;
    var colors = _ref$colors === undefined ? [] : _ref$colors;

    var nextColor = nextColorProvider();
    var graph = { vertices: vertices, edges: edges, colors: colors, nextColor: nextColor };
    graph.colors = new Array(graph.vertices.length);

    // color
    var remaining = colorStep(graph);
    while (remaining.length) {
        remaining = colorStep(graph, remaining);
    }

    return graph.colors;
}

function countEdges(valence, edges) {
    edges.forEach(function (e) {
        if (e[0] !== e[1]) {
            valence[e[0]]++;
            valence[e[1]]++;
        }
    });
}

function maxValence(vertices, edges) {
    var valence = new Object();
    vertices.forEach(function (v) {
        return valence[v] = 0;
    });
    countEdges(valence, edges);

    // swapping key value
    var valueSwapped = new Object();
    Object.keys(valence).forEach(function (k) {
        valueSwapped[valence[k]] = k;
    });

    var max = Object.keys(valueSwapped).sort()[0];
    return valueSwapped[max];
}

function getVertexIndex(graph, vertex) {
    return graph.vertices.indexOf(vertex);
}

function getColor(graph, vertex) {
    return graph.colors[getVertexIndex(graph, vertex)];
}

function isConnectedToColoredVertex(graph, vertex) {
    var index = getVertexIndex(graph, vertex);
    var connected = new Set();

    graph.edges.forEach(function (e) {
        if (e[0] === vertex) connected.add(e[1]);
        if (e[1] === vertex) connected.add(e[0]);
    });

    return [].concat(_toConsumableArray(connected)).filter(function (x) {
        return getColor(graph, x) !== undefined;
    }).length;
}

function colorStep(graph) {
    var remaining = arguments.length <= 1 || arguments[1] === undefined ? graph.vertices : arguments[1];

    var color = graph.nextColor();
    var maxVertex = maxValence(remaining, graph.edges);

    // get index of first element
    var vertexIndex = getVertexIndex(graph, maxVertex);
    graph.colors[vertexIndex] = color;

    graph.vertices.forEach(function (x) {
        vertexIndex = getVertexIndex(graph, x);
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
        return graph.colors[i] === undefined;
    });
}