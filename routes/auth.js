const express = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const route = express.Router()


route.post('/login', async(req, res) =>{
    const { email,password } = req.body
    try{
        if (email && password){
            const user = await User.findOne({ email })
            // check if email is existing
            if (user){
                if ( await bcrypt.compareSync(password,user.password)){
                    const token = jwt.sign({ _id : user._id }, process.env.TOKEN_SECRET)
                    return res.status(200).json({ 
                        status: true, 
                        user: { _id : user._id, email : user.email, role: user.role },
                        token
                    })
                }
                else {
                    return res.status(400).json({ status: false, msg: "Invalid password." })
                }
            }
            else {
                return res.status(400).json({ status: false, msg: "User not found." })
            }
        }
        
    } catch  (e){
        return res.status(400).json({ status: false, msg: e })

    }
})



module.exports = route