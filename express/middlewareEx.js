function middleware(req, res, next){
    console.log('MiddleWare')
    next()
}

module.exports = middleware