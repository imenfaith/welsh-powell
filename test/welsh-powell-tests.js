var assert = require("assert");
import {color} from "../src/welsh-powell";

describe("welsh-powell", function() {
    it("graph with 1 vertex", function() {
        var vertices = ['a'];
        var output = color({vertices});
        assert(output.colors.length > 0);
    });

    it("graph with 2 vertices, 0 edges", function() {
        var vertices = ['a', 'b'];
        var output = color({vertices});
        assert(output.colors[0] === output.colors[1]);
    });

    it("graph with 2 vertices, 1 edge", function() {
        var vertices = ['a', 'b'];
        var edges = [['a', 'b']];
        var output = color({vertices, edges});
        assert(output.colors[0] !== output.colors[1]);
    });

    it("graph with 3 vertices, 2 edges", function() {
        var vertices = ['a', 'b', 'c'];
        var edges = [['a', 'b'], ['b', 'c']];
        var output = color({vertices, edges});
        var colorSet = new Set(output.colors);
        assert([...colorSet].length === 2);
    });
});
