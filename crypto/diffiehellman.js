const { ECANCELED } = require('constants');
const crypto = require('crypto');
// const assert = require('assert');

// const alice = crypto.createDiffieHellman(10);
// const aliceKey = alice.generateKeys('hex');

// console.log('Get Prime', alice.getPrime('hex'))
// console.log('Get generate Keys', aliceKey)
// console.log('Get Generator', alice.getGenerator('hex'))
// console.log('Get Private Key', alice.getPrivateKey('hex'))
// console.log('Get Public Key', alice.getPublicKey('hex'))
// const bob =crypto.createDiffieHellman(alice.getPrime(), alice.getGenerator());
// const bobKey = bob.generateKeys();

// const aliceSecret = alice.computeSecret(bobKey);
// const bobSecret = bob.computeSecret(aliceKey);

// const a = assert.strictEqual(aliceSecret.toString('hex'), bobSecret.toString('hex'));


// console.log(aliceSecret.toString('hex'));
// console.log(bobSecret.toString('hex'));



// const alice = crypto.getDiffieHellman('modp15')
// const bob = crypto.getDiffieHellman('modp15')

// const  aliceKey = alice.generateKeys()
// const bobKey = bob.generateKeys();

// const aliceSecret = alice.computeSecret(bobKey, null, 'hex')
// const bobSecret = bob.computeSecret(aliceKey, null, 'hex')

// console.log(aliceSecret === bobSecret);


const venkat = crypto.createECDH('secp256k1');
venkat.generateKeys();

const vj = crypto.createECDH('secp256k1');
vj.generateKeys();

const venkatPublicKeys = venkat.getPublicKey().toString('base64');
const vjPublicKeys = vj.getPublicKey().toString('base64');

const venkatSharedKeys = venkat.computeSecret(vjPublicKeys, 'base64', 'hex')
const vjSharedKeys = vj.computeSecret(venkatPublicKeys, 'base64', 'hex')

const MESSAGE = 'hello vj this is me';

const IV = crypto.randomBytes(16);
const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(venkatSharedKeys, 'hex'), IV);

let encrypted = cipher.update(MESSAGE, 'utf-8', 'hex');
encrypted += cipher.final('hex');

const auth_tag = cipher.getAuthTag().toString('hex');
console.table({
    IV: IV.toString('hex'),
    encrypted: encrypted,
    authTag: auth_tag
});

const payload = IV.toString('hex') + encrypted + auth_tag;

const payload64 = Buffer.from(payload, 'hex').toString('base64');
console.log(payload64);

//vj will do from here

const vj_payload = Buffer.from(payload64, 'base64').toString('hex');

const vj_IV = vj_payload.substr(0, 32);
const vj_encrypted = vj_payload.substr(32, vj_payload.length - 32 - 32);
const vj_auth_tag = vj_payload.substr(vj_payload.length - 32, 32);

console.table({
    IV: vj_IV,
    encrypted: vj_encrypted,
    authTag: vj_auth_tag
});

try{
    const decipher = crypto.createDecipheriv('aes-256-gcm', Buffer.from(vjSharedKeys, 'hex'), Buffer.from(vj_IV, 'hex'));
    decipher.setAuthTag(Buffer.from(vj_auth_tag, 'hex'));

    let decrypted = decipher.update(vj_encrypted, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    console.log(decrypted);
}catch(err){
console.log(err);
}

 