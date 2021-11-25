const dns = require('dns');
const option = {
    family : 6,
    hints : dns.ADDRCONFIG | dns.V4MAPPED,
};

dns.lookup('google.com',option,  (err, address, family) =>{
     console.log('address: %j family: IPv%s', address, family);
});

option.all = true;
dns.lookup('google.com',option, (err, addresses)=>{
    console.log('addresses %j', addresses);
});