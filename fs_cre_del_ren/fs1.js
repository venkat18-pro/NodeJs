const fs = require('fs');

// fs.mkdir('./File', { recursive: true } ,(err)=>{
//     if(err) throw err;
//     fs.writeFile('./File/hello.txt', 'hell world', (err)=>{
//         if (err) throw err;
//     });
// });

const one = 'one.txt';
// const newone = 'newone.txt';

// fs.stat(one,{bigint:true}, (err, data)=>{
//     if(err) throw err;
//     console.dir(data, {colors:true});
// })
// information about file details.
// const stats = fs.statSync(newone);
// console.log(stats)

// Acces method:
/*
try{
fs.access(one, (err)=>{
    console.log(`${one} ${err ? 'does not exist' : 'exists'}`)
})
}catch(e){
    console.log(err);
}
*/

// fs.appendFile(one, 'hi how are you', err => console.log(err));
// Append File Method:
/*
function closeFd(fd) {
    fs.close(fd, (err)=>{
        if(err) throw err
    });
}

fs.open(one, 'a', (err, fd)=>{
    if(err) throw err;
    try{
        fs.appendFile(fd, 'hello World Hi', (err)=>{
            closeFd(fd);
            if(err) {
                throw err;
            }else{
                console.log('file is appended')
            }
        });
    }catch(err){
        closeFd(fd);
        throw err;
    }
})
*/

// fs.stat(one, (err, data)=>{
//     if(err) throw err;
//     data.gid = 30;
//     console.log(data);
// })

// fs.chmod(one, 0o200, (err)=>{
//     if(err) throw err;
//     console.log('The permissions for file "my.txt" have been changed!');
// });

function callback(err) {
    if(err) throw err;
    console.log('success!');
}

// fs.copyFile('one.txt', 'second.txt', callback);

// fs.copyFile('one.txt', 'third.txt', fs.constants.COPYFILE_FICLONE, callback);

// fs.futimes(70, 20, 10, callback);

// fs.realpath.native('newone.txt', (err, res)=>{
//     if(err) throw err;
//     console.log(res)
// })

// fs.rename('newone.txt', 'newOne.txt', (err)=>{
//     if(err) throw err;
//     console.log('Renamed')
// })

// fs.rm('third.txt', err => {
//     if(err) throw err;
//     console.log('Remove the file')
// })

// fs.truncate('one.txt', callback)

// fs.copyFile('second.txt', 'newOne.txt', callback)

// fs.unlink('one.txt', callback)

// fs.watchFile('second.txt', (cur, pre)=>{
//     console.log(`the current mtime is : ${cur}`)
//     console.log(`the previce mtime is : ${pre}`)
// })

let filehandle = null;
try{
filehandle =await fs.open('second.txt', 'a');
await filehandle.appendFile('Hello am venkat18');
}finally{
  filehandle?.close();
}