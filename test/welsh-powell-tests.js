import assert from "assert";
import generate from "graph-generator";
import color from "../src/welsh-powell";
import check from "./graph-color-checker";

describe("welsh-powell", function() {
    it("graph with 1 vertex", function() {
        var vertices = ['a'];
        var output = color({vertices});
        assert(check({vertices}, output));
    });

    it("graph with 2 vertices, 0 edges", function() {
        var vertices = ['a', 'b'];
        var output = color({vertices});
        assert(check({vertices}, output));
    });

    it("graph with 2 vertices, 1 edge", function() {
        var vertices = ['a', 'b'];
        var edges = [['a', 'b']];
        var output = color({vertices, edges});
        assert(check({vertices, edges}, output));
    });

    it("graph with 3 vertices, 2 edges", function() {
        var vertices = ['a', 'b', 'c'];
        var edges = [['a', 'b'], ['b', 'c']];
        var output = color({vertices, edges});
        console.log(output);
        var colorSet = new Set(output);
        assert([...colorSet].length === 2);
        assert(check({vertices, edges}, output));
    });
});

// not really unit tests
describe("welsh-powell on random graphs", function() {
    for(let i = 0; i < 20; i++) {
        it("graph #" + i, function() {
            var graph = generate();
            var output = color(graph);
            assert(check(graph, output));
        });
    }
});
