const https = require('https');
const fs = require('fs');
const path = require('path');

const url = 'https://youtu.be/eJ3Ef1sGnTg';
const name = path.basename(url);

const res = https.get(url, async (res)=>{
    const fileName =await fs.createWriteStream(name);
    res.pipe(fileName);
    fileName.on('finish', ()=>{
        fileName.close();
        console.log('File downloaded successfuly');
    })
    fileName.on('error', err => console.log(err));
});

res.on('error', (err) => {
    console.log('Something Error');
    console.log(err);
})
