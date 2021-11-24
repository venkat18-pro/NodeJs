/*var cluster = require('cluster');
var express = require('express');
var numcpus = require('os').cpus().length;

if(cluster.isMaster){
    for(var i=0; i< numcpus; i++){
        var cl= cluster.fork();
    }
}else{
    var app = express();
     app.get('/',(req, res)=>{
        res.send('Hello World');
    });

    app.listen(3000, ()=>{
        console.log('server is working');
    }
    );
}*/


const cluster = require('cluster');
const http = require('http');
const { worker } = require('cluster');
const numCpus = require('os').cpus().length;

if(cluster.isMaster){
    console.log(`Master ${process.pid} is running`);
    for(i=0; i< numCpus; i++){
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal)=>{
        console.log(`worker ${worker.process.pid} died`);
        cluster.fork();
    });
}else{
    http.createServer((req, res)=>{
        res.writeHead(200);
        res.end(`process id: ${process.pid}`);
        process.kill();
    }).listen(8000);

    console.log(`worker ${process.pid} stared`);

}
/*
const cluster = require('cluster');
const http = require('http');

if(cluster.isMaster){
    let numReqs = 0;
    setInterval(() => {
        console.log(`numReqs= ${numReqs}`);
    }, 1000);

    function messageHandler(mes){
        if(mes.cmd && mes.cmd === 'notifyRequest'){
            numReqs +=1; 
        }
    }

    const numCpus = require('os').cpus().length;
     for(let i= 0;i< numCpus; i++){
         cluster.fork();
     }

    for(const id in cluster.worker){
        cluster.workers[id].on('message', messageHandler);
    }
} else{
    http.Server((req, res)=>{
        res.writeHead(200);
        res.end('hello world\n');

        process.send({cmd: 'notifyRequest'});
    }).listen(8000);
}

const cluster = require('cluster');

if(cluster.isMaster){
    const worker = cluster.fork();
    let timeout;

    worker.on('listening', (adderss)=>{
        worker.send('shutdown');
        worker.disconnect();
        timeout = setTimeout(() => {
            worker.kill()
        }, 2000);

    });

    worker.on('disconnect', ()=>{
       clearTimeout(timeout);
    });
} else if(cluster.isWorker){
    const net = require('net');
    const server = net.createServer((socket)=>{

    });

    server.listen(8000);

    process.on('message', (msg)=>{
        if(msg=== 'shutdown'){
            console.log('connnection is colsed');
        }
    });
}
// worker.dead() method
const cluster = require('cluster');
const http = require('http');
const numCpus = require('os').cpus().length;

if(cluster.isMaster){
    console.log(`master ${process.pid} is running`);

    for(let i= 0;i< numCpus;i++){
        cluster.fork();
        console.log(i);

 }
        cluster.on('fork', (worker)=>{
            console.log(`worker is dead1:${process.pid} `,worker.isDead());
        });

        cluster.on('exit', (worker, code, signal)=>{
            console.log(`worker is dead2${process.pid}:`,worker.isDead());
           });
        console.log('This is if part');
    }else{
        http.createServer((req, res)=>{
            res.writeHead(200);
            res.end(`Current process\n ${process.pid}`);
            process.kill(process.pid);
            
                    }).listen(8000);
        console.log('This is else part');
    }
     // worker.send() method
    const cluster = require('cluster');
    if(cluster.isMaster){
        const worker = cluster.fork();
        worker.send('hi there');
        
    }else if(cluster.isWorker){
        process.on('message', (msg)=>{
            console.log(msg);
        process.kill(process.pid);

        });
    }

    const cluster = require('cluster');

    
    const timeout = [];
    function errorMsg(){
        console.log('somthing must ne wrong with the connection...');
    }
    
    cluster.on('fork', (worker)=>{
        timeout[worker.pid] = setTimeout(errorMsg, 2000);
    });

    cluster.on('listening', (worker, adderss)=>{
        console.log('listning');
        clearTimeout(timeout[worker.pid]);
    });

    cluster.on('exit', (worker, code, signal)=>{
        console.log('exit');
        clearTimeout(timeout[worker.pid]);
        errorMsg();
    });

    
    const cluster = require('cluster');
    const http = require('http');
    const numCpus = require('os').cpus().length;
    
    if(cluster.isMaster){
        console.log(`master ${process.pid} is running`);
    
        for(let i= 0;i< numCpus;i++){
            cluster.fork();
            console.log(i);
    
     }
         cluster.on('listening', (worker, address)=>{
            console.log(`worker: ${worker}`);
            console.log(`address type${address.addressType}`);
            console.log(`address port${address.port}`);
            console.log(`adress${address.address}`);

        });
           
          cluster.on('online', (worker)=>{
              console.log('yay, the worker responded after the it was forked');
          });
     
            console.log('This is if part');
        }else{
            http.createServer((req, res)=>{
                res.writeHead(200);
                res.end(`Current process\n ${process.pid}`);
                process.kill(process.pid);
                
                        }).listen(8000);
            console.log('This is else part');
        }
    
        const cluster = require('cluster');

        if(cluster.isMaster){
            console.log('master');
            cluster.fork();
            cluster.fork();
            cluster.fork();

            
        }else if(cluster.isWorker){
            console.log(`worker #${cluster.worker.id}`);
            process.kill(process.pid);
        }*/
