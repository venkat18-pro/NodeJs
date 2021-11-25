const d = require('domain').create();

d.on('error', (er)=>{
    console.log(`error, but oh well ${er.message}`);
});
d.run(()=>{
    require('http').createServer((req, res)=>{
        handleRequest(req, res);
    }).listen(3000);
});

console.log('server is working');