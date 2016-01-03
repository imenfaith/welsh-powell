var assert = require("assert");
import {color} from "../src/welsh-powell";

describe("welsh-powell", function() {
    it("should color a simple graph", function() {
        var vertices = ['a'];
        var output = color({vertices});
        assert(output.colors.length > 0);
    });
});
