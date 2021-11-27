const express = require('express');
const app = express();
// const { user, admin } = require('./router')
const port = 3000;

// app.use('/brids', brids)
// app.get('/', (req, res) => {
//     res.send('Hello World')
// })

// app.get('/ab?cd', (req, res) =>{
//     res.send('ad?cd')
// })

// app.get('/ab', async (req, res) => {
//     const data = req.params;
//    await res.send(`i am ab ${data}`)
// })
// app.get('/user/:fromuserid-:touserId', (req, res) => {
//     res.send(req.params)
// })
// app.get('/user/b',function (req, res, next) {
//     console.log('the response will be send by the next function');
//     next()
// },function (req, res){
//     res.send('Hello from B');
// });
// app.all('/all', (req, res) => {
//     res.send('send for all')
// })

// app.param(['id', 'page'], (req, res, next, values)=>{
//     console.log('Param function called', values);
//     next();
// })

// app.get('/name/:id/:page', (req, res)=>{
//     console.log('get Function');
//     res.end();
// })

// app.param(function(params, option) {
//     return function(req, res, next, val){
//         if(val == 18){
//             next();
//             console.log('param custiom function');
//         }else {
//             res.send('NOT User ID')
//         }
//     }
// });

// app.param('id', 18);

// app.get('/name/:id', (req, res)=>{
//     res.send('OK');
// });

// const blog = express();
// const blogAdmin = express();

// app.use('/blog', blog);
// blog.use('/admin', blogAdmin);

// console.dir(app.path())
// console.dir(blog.path())
// console.dir(blogAdmin.path())

// app.set('venkat', '18');
// app.get('venkat');


// const user = express();
// const admin = express();

// app.use('/user', user);
// app.use('/admin', admin);

app.get('/', (req, res)=>{
    res.send('Home')
});
const router = express.Router()

router.get('/name', (req, res)=>{
    // console.dir(req.cookies)
    console.dir('Fresh ' + req.fresh)
    console.dir('Hostname ' + req.hostname)
    console.dir('ip ' + req.ip)
    console.dir('Method ' + req.method)
    console.dir('OriginalUrl ' + req.originalUrl)
    console.dir('Path ' + req.path)
    console.dir('Protocol ' + req.protocol)  
    console.dir('Route ' + req.route)
    console.dir('secure ' + req.secure)
    res.send("Base Url " +  req.baseUrl);
})

router.get('/id', (req, res)=>{
    console.log(req.fresh);
    console.log(req.accepts('html'));
    res.append('Set-Cookie', 'name = venkat; Path=/; HttpOnly');
    console.log(req.get('Set-Cookie'));
    res.redirect(200, '/profile/name')
    res.end();
})
app.use('/profile', router);



app.listen(3000, () => console.log('server is working'));
