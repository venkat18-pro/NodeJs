/*const crypto = require('crypto');

const secret = 'abc';
const hash = crypto.createHmac('sha256', secret).update(' I love cpu').digest('hex');

console.log(hash);

let crypto;
try{
    crypto = require('crypto');
   console.log('no error');
}catch(err){
    console.log('crypto suuport is disable');
}

const {Certificate} = require('crypto');

const spkac = 'abc';
const challenge = Certificate.exportChallenge(spkac);
console.log(challenge.toString('utf8'));

const crypto = require('crypto');

const cert1 = new crypto.Certificate();
const cert2 = crypto.Certificate();

console.log(`cert1 ${cert1}`);
console.log(`cert2 ${cert2}`);

//Certificate.exportChallenge(spkac, (encoding));
//Certificate.exportPubliKey(spkac, (encoding));
//Certificate.verifySpkac(spkac, (encoding));*/



