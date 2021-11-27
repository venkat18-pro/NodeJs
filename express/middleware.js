// const express = require('express');
// const middleware = require('./middlewareEx');
// const app = express();

// app.use(middleware);

// app.get('/', (req, res)=>{
//     console.log('Home');
//     res.send('Home Page');
// })

// app.get('/user/:id', function (req, res,next){
//     console.log('User');
//     console.log(req.params.id)
//     if(req.params.id === '0')
//     next('route')
//     else next()
// }, function (req, res, next){
//     console.log('user 2')
//     res.send('regular')
// })

// app.get('/user/:id', function (req, res, next){
//     console.log('user3')
//     res.send('special');
// })


// app.listen(3000, ()=>{
//     console.log('Server is Working');
// });

module.exports = function(req, res) {
    res.send('Profile', req.app.get('view'))
}