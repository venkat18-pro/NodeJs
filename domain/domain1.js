const cluster = require('cluster');
const PORT = +process.env.PORT || 1337;

if(cluster.isMaster){
    cluster.fork();
    cluster.fork();

    cluster.on('disconnect', (worker) =>{
        console.error('disconnect');
        cluster.fork();
    });
}else {
    const domain = require('domain');
    const server = require('http').createServer((req, res) =>{
        const d = domain.create();
        d.on('error', (er) =>{
            console.log(`error ${er.stack}`);

            try{
                const killTimer = setTimeout(() =>{
                    process.exit(1);
                },3000);
                killTimer.unref();

                server.close();

                cluster.worker.disconnect();

                res.statusCode = 500;
                res.setHeader('content-type', 'text/plain');
                res.end('Oops,there was a problem\n');
            }catch (er2){
                console.error(`Error sending 500! ${er2.stack}`);
            }
        });

        d.add(req);
        d.add(res);
        d.run(() =>{
            handleRequest(req, res);
        });
    });
    server.listen(PORT, ()=>{
        console.log('server is working')
    });
}

function handleRequest(req, res){
    switch (req.url){
        case '/error':
            setTimeout(() =>{
                flerb.bark();
            },3000);
            break;
            default:
                res.end('ok');
    }
}
