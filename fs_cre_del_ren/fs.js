var http =require('http');
var fs = require('fs');


http.createServer((req, res) =>{
    fs.readFile('fsadd.html' , (err, data) =>{
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
}).listen(4000);
console.log('this server is working');