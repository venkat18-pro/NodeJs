var fs= require('fs');

fs.rename('newone1.txt','one.txt', (err) =>{
    if(err) throw err;
    console.log('saved');

});
console.log('File will be rename');