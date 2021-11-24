const crypto = require('crypto');

const alg = 'aes-192-cbc';
const password = 'Password used to generate key';

const key = crypto.scryptSync(password, 'salt', 24);
const iv = Buffer.alloc(16, 0);
const cipher = crypto.createCipheriv(alg, key, iv);
const decipher = crypto.createDecipheriv(alg, key, iv);

// let encrypted = '';
// cipher.on('readable', ()=>{
//     let chunk;
//     while(null !== (chunk = cipher.read())) {
//         encrypted += chunk.toString('hex')
//         console.log(encrypted);
//     }
//     console.log(chunk)
// });

// cipher.on('end', ()=>{
//     console.log(encrypted);
// });

// cipher.write('VENKat18@');
// cipher.end();   

let encrypted = cipher.update('VENKat18@', 'utf8', 'hex');
encrypted += cipher.final('hex');
console.log(encrypted);

let decrypted = decipher.update(encrypted, 'hex', 'utf8');
decrypted += decipher.final('utf8');
console.log(decrypted);