var express = require('express');
var app = express();
var port = 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.get('/name/:user_name', (req, res) => {
    res.status(200);
    res.set('Content-type', 'text/html');
    res.send('<html><body>' +
                '<h1> Hello ' + req.params.user_name + '</h1>' + 
                '</body></html>');
});

app.listen(port, () =>{
    console.log('server is working');
});
