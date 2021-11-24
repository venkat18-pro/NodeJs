const crypto = require('crypto');
const Buffer = require('buffer');

const al = 'aes-192-cbc';
const pw = 'password used to generate key';

const key = crypto.scryptSync(pw, 'salt', 24);



const decipher = crypto.createDecipheriv(al, key);
 console.log(decipher.final());
/*let decrypted = '';
decipher.on('readable', ()=>{
    while (nulll !== (chunk = decipher.read())){
        decrypted += chunk.toString('utf8');
    }
});
decipher.on('end', ()=>{
    console.log(decrypted);
});

const encrypted = 'e5f79c59c02171eec6b212d5520d44480993d7d622a7c4c2da32f6efda0ffa';

decipher.write(encrypted, 'hex');
decipher.end();*/

