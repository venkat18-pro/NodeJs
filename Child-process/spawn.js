/*const fs = require('fs');
const cp = require('child_process');

for(var i=0; i<3 ; i++){
    var workerProcess = cp.spawn('node', ['support.js', i]);
    workerProcess.stdout.on('data', (data)=>{
        console.log(`data ${data}`);
    });

    workerProcess.stderr.on('data', (err)=>{
        console.log(`error ${err}`);
    });

    workerProcess.on('close', (code)=>{
        console.log(`child process exited with code ${code}`);
    });
}*/

const {spawn} = require('child_process');

const ls = spawn('ls', ['-1h', '/usr']);

ls.stdout.on('data', (data)=>{
   
      console.log(`stdout : ${data}`);
});

ls.stderr.on('data', (err)=>{
    console.log(`stderr : ${err}`);
});

ls.on('close', (code)=>{
    console.log(`chold process exited with code ${code}`);
});