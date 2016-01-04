export function generate() {
    var vertices = [];
    for(let i = 1; i <= oneToTen(); i++) {
        vertices.push(i);
    }

    var edges = [];
    for(let i = 1; i <= vertices.length; i++) {
        var rand = (Math.round(Math.random() * 100) % vertices.length) + 1;
        if (edges.findIndex(j => j[0] === i && j[1] === rand) < 0) {
            edges.push([i, rand]);
        }
    }

    return {
        vertices: vertices.map(i => getChar(i)),
        edges: edges.map(i => i.map(j => getChar(j)))
    };
}

function getChar(i) {
    return String.fromCharCode(96 + i);
}

function oneToTen() {
    return Math.round(Math.random() * 10) + 1;
}



