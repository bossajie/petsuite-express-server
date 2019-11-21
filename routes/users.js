const express = require('express')
const router = express.Router()
const User = require('../models/User')


// view all users
router.get('/', async(req,res) => {
   const users = await User.find()
   try{
        res.status(200).json({ status: true, users })
   } catch (e){
       res.status(400).json({ status: false, msg: e })
   }
})

// specific user
router.get('/:userId', async(req,res)=>{
    console.log(req.params.userid)
    try { 
        const user = await User.findById(req.params.userId)
        res.status(200).json({ status: true, user })
    } catch (e) {
        res.status(400).json({ status: false, msg : e })
    }
})

// add user
router.post('/', async(req,res)=>{
    const { firstname,lastname,role,email,password } = req.body
    const user = new User({
        firstname,
        lastname,
        role,
        email,
        password
    })
    try { 
        const savedUser = await user.save()
        res.status(200).json({ status: true, user : savedUser})
    } catch (e){
        res.status(400).json({ status: false, error: e })
    }
})

// update
router.patch('/:userId', async(req,res) => {
    const { firstname,lastname,role,email,password } = req.body
    const user = new User({
        firstname,
        lastname,
        role,
        email,
        password
    })
    try {
        const updatedUser = await User.updateOne({
            _id: req.params.userId},
            { $set : {
                firstname,
                lastname,
                role,
                email,
                } 
            }
            )
        res.status(200).json({ status: true, user: updatedUser })
        
    } catch(e) {
        res.status(400).json({ status: false, error: e })
    }
})


// delete user
router.delete('/:userId', async(req,res)=>{
    try {
        const deletedUser = await User.deleteOne({ _id: req.params.userId})
        res.status(200).json({ status: true, user: deletedUser })
    } catch (e){
        res.status(400).json({ status: false, error: e })
    }
})



module.exports= router