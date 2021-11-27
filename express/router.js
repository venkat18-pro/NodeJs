const express = require('express')
const router = express.Router()
const user = express.Router()
const admin = express.Router()

router.use(function (req, res, next) {
    console.log('Time: ', Date.now())
    next();
})

router.get('/', (req, res, next) => {
    res.send('Birds Home page')
    next()
})

router.get('/about', (req, res) => {
    res.send('About us')
})

router.param(['id', 'page'], (req, res, next, id)=>{
    console.log('Param function', id);
    next();
});

router.get('/name/:id/:page', (req, res)=>{
    console.log('Get function');
    res.end()
})

user.get('/', (req, res)=>{
    res.send('User Home')
});

user.get('/profile', (req, res)=>{
    res.send('User Profile');
})

admin.get('/', (req, res)=>{
    res.send('Admin Home')
});

admin.get('/profile', (req, res)=>{
    res.send('Admin Profile');
})

module.exports = { user, admin }