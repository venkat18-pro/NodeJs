process.on('message', (m, server)=>{
    if(m=== 'server'){
        server.on('connection' ,(socket)=>{
            socket.end('handle by child');
            console.log('child handle');
        });
    }
});