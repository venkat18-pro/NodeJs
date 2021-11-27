var express = require('express');
var app = express();
var port = 3000;

app.get('/', (req, res) =>{
    res.end('hello world');
});

app.listen(port, () => {
    console.log('server working');
});