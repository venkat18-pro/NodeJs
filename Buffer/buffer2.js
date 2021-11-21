/*const buf = Buffer.from([1,2,3,4]);

const uint32array= new Uint32Array(buf);

console.log(uint32array);

const buf = Buffer.from('hello','utf16le');

const uint16array =new Uint16Array(
    buf.buffer,
    buf.byteOffset,
    buf.length);
console.log(uint16array);

const arr = new Uint16Array(2);

arr[0]= 5000;

arr[1] = 4000;

const buf1 = Buffer.from(arr);

const buf2 = Buffer.from(arr.buffer);

console.log(buf1);

console.log(buf2);

arr[1] = 6000;
console.log(buf1);

console.log(buf2);

const arr =new Uint16Array(9);

const buf = Buffer.from(arr.buffer, 0, 18);

console.log(buf.length);

const buf = Buffer.from([1,2,3]);

for(const a of buf){

    console.log(a);
}
// buffer to write method
var buf =Buffer(256);

var len = buf.write('simply easy Learing');

console.log('octets :' + len);

//buffer to toString method
const buf = Buffer(26);

for(var i =0 ; i <26; i++){
    buf[i]=i+ 97;
}

console.log(buf.toString('ascii'));
console.log(buf.toString('ascii', 0, 10));
console.log(buf.toString('utf8', 0, 5));
console.log(buf.toString(undefined,0,5));

//buffer to JSON method

const buf = Buffer('simply easy learing');
var json = buf.toJSON(buf);

console.log(json);*/

//buffer to Concatenate method

const buffer1 = Buffer('Hi');
const buffer2 = Buffer(' Venkat');
const buf = Buffer.concat([buffer1,buffer2]);

console.log(buf.toString());

