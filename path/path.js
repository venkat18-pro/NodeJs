const path = require('path');

var baseName = path.basename('D://node_js_programms/path/path.js', '.js');

// console.log(baseName);
// var name = process.env.PATH.split(path.delimiter);
// console.log(name);

// var name = path.dirname('D://node_js_programms/path');
// console.log(name);

// var name = path.join('D:','//node_js_programms','/pa');
// console.log(name);

// var name = path.normalize('D:////node_js_programms////path');
// console.log(name);

var name = path.parse('D://node_js_programms/path/path.js');
console.log(name);

var Myname = path.format({
    root: name.root,
    dir: name.dir,
    base: name.base,
    ext: name.ext,
    name: name.name
});

console.log(Myname)