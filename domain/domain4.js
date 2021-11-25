const d = require('domain').create();
const fs = require('fs');
d.on('error', (er)=>{
    console.error('Caught error', er);
});
d.run(()=>{
    process.nextTick(()=>{
        setTimeout(()=>{
            fs.open('non-existent file', 'r', (er, fd)=>{
                if(er) throw er;
            });
        },100);
    });
});