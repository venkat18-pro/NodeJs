// const buf = Buffer.from('hello', 'utf8');
// for (const b of buf){
//     console.log(b)
// }
// console.log(buf);
// const uint32array = new Uint32Array(buf);
// console.log(uint32array);
// console.time();
// const fs = require('fs');

// const read = fs.readFile('video.mp4', (err, data)=>{
//     if(err) throw err;
//     console.log(data.length);
//     const buf = Buffer.alloc(data.length, data);
//     var count = 0
//     const bufCount = buf.entries();
//     for(count;count < data.length;count++){
//         if(bufCount[count] === 00){
//         count += 1;
//         console.log(count);
//         }
//     }
//     console.log(count)
    // fs.writeFile('video1.mp4', data, (err)=>{
    //     if(err) throw err;
    //     console.log('Success');
    // });
// });

// const stream = fs.createReadStream('video.mp4');
// const write = fs.createWriteStream('video2.mp4');

// stream.pipe(write)

// stream.on('error', (err)=>{
//     console.log(err);
// });

// stream.on('data', (data)=>{
//     console.log(data.length)
    
//     const buf = Buffer.alloc(data.length, data);
//     console.log(buf)  
// });
// console.timeEnd();

// let buf = Buffer.from('buffer');
// let buf2 = Buffer.from(buf);
// buf[0] = 0x61;
// console.log(buf.toString());
// console.log(buf2.toString());

// let buf = Buffer.from('Hello hi');
// let buf1 = Buffer.from('41', 'hex');

// console.log(buf)
// console.log(buf.toString())
// console.log(buf1.toString())

const b = Buffer.allocUnsafe(50).fill('\u0233')
console.log(b.toString());