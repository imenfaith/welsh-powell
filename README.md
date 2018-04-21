## Install
```javascript
npm install welshpowell --save-dev
```

## Usage
```javascript
const color = require ('welsh-powell');
let graph = {
    vertices: ['a', 'b', 'c'],
    edges: [['a', 'b'], ['b', 'c']]
};

// returns an array with colors
// matching the index of the vertices
// passed in.
let colors = color.color(graph);

console.log(colors);

// output [0, 1, 0]
// 'a' => 0, 'b' => 1, 'c' => 0
```

