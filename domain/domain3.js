const d = require('domain').create();
const fs = require('fs');

function readSomeFile(filename, cb){
   fs.readFile(filename, 'utf8', d.bind((er, data)=>{
       return cb(er, data ? JSON.parse(data) : null);
   }));
}

d.on('error', (er)=>{
    console.error('error', er);
});
var file = './hello.txt';
var hi = '';
readSomeFile(file, hi);