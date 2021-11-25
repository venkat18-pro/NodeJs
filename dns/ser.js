var http = require('http');
var url=require('url');
http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type': 'text/html'});
    var q=url.parse(req.url,true).query;
    var txt=q.year+" "+q.month;
    res.end(txt+'this is url year and month');
    
}).listen(3000);
console.log('the server is working onSS');