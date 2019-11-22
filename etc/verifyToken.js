const jwt = require('jsonwebtoken')

module.exports = function auth (req,res,next){
    const token = req.header('token');
    if (!token){
        return res.status(400).json({ status: false, msg: 'Access denied. Invalid token' })
    }
    try {
        const verified = jwt.verify(token,process.env.TOKEN_SECRET)
        if (verified){
            next()
        }
    } catch (e){
        res.status(400).json({ status: false ,msg : e})
    }
}