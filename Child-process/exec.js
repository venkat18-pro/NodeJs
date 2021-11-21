// const { stdout } = require('process');

/* example1 for exec child process

const exec = require('child_process').exec;

exec('my.bat', (error, stdout, stderr)=>{
    if(error){
        console.log(error.stack);
        console.log(error.name);
        console.log(error.signal);

    }

    console.log(`stdout${stdout}`);
    console.log(`stderr ${stderr}`);
});*/

//Example 2 for exec child process

/*const fs = require('fs');

const cp = require('child_process');

for (var j=0; j<=0; j++){
     var wp = cp.exec('node support.js' + j, (error, stdout, stderr)=>{
        if(error){
            console.log(error.stack);
            console.log(`Error code ${error.code}`);
            console.log(`signal error ${error.signal}`);
        }
        console.log(`Stdout ${stdout}`);
        console.log(`stderr ${stderr}`);
         });
         wp.on('exit', (code)=>{
             console.log('child process is exit'+ code);
         });
}*/

// Example 3
/*const { exec } = require('child_process');

exec('cat *.js missing_file | wc -1', (error, stdout, stderr)=>{
    if(error){
        console.log(`exec error: ${error}`);
        return;
    }
    console.log(`stdout : ${stdout}`);
    console.log(`stderr : ${stderr}`);
});*/

// using util.promisify()
/*const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function isExample(){
    try{
    const { stdout, stderr } = await exec('ls');
    console.log('stdout: ', stdout);
    console.log('stderr: ', stderr);
    }catch(err){
        console.log('Error: ', err);
    }
}
isExample();
*/
// Example ExecFile()
/*const { execFile } = require('child_process');
const child = execFile('npm', ['-v'], (error, stdout, stderr)=>{
    if(error) throw error;
    console.log('stdout :', stdout);
});*/

// Example of spawn()
const cp = require('child_process');

let opt = {
    list: 'ls',
    copy: 'cp',
    folder: 'mkdir'
}

const child = cp.spawn(opt.list, ['-a']);
child.stdout.on('data', data => console.log('stdout: ',data));
child.stderr.on('data', data => console.log('stderr: ',data));
child.on('error', (err) => console.log('Error: ', err));