const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const verifyToken = require('../etc/verifyToken')
const router = express.Router()

// view all users
router.get('/', async(req,res) => {
    try{ 
        if (!req.query.page){
            const users = await User.find()
            return res.status(200).json({ status: true, users })
        } else {
            const perPage = 10
            const page =   parseInt(req.query.page)
            let totalCounts = 0
            await User.find({}, (error,results) =>{
                User.countDocuments( (err,count) =>{
                    totalCounts = count
                    const pagination = {
                        page,
                        perPage,
                        total : count,
                        lastPage : Math.ceil(count/perPage)
                    }
                    res.status(200).json({ status: true, users: results, page:pagination })
                })
            })
            .select("-password")
            .limit(perPage)
            .skip(totalCounts < perPage ? (page * perPage)- perPage : 0)
        }
    } catch (e){
        res.status(400).json({ status: false, msg: e })
    }
})

// specific user
router.get('/:userId', async(req,res)=>{
    console.log(req.params.userid)
    try { 
        const user = await User.findById(req.params.userId).select("-password")
        res.status(200).json({ status: true, user })
    } catch (e) {
        res.status(400).json({ status: false, msg : e })
    }
})

// add user
router.post('/', verifyToken ,async(req,res)=>{
    const { firstName,lastName,role,email,password } = req.body.user
    try { 
        if ( await User.findOne({ email }) ){
            return res.status(400).json({ status: false, msg: 'Email already exist' })
        }
        // hash password
        const salt  = await bcrypt.genSaltSync(10)
        const hashedPassword = await bcrypt.hashSync(password,salt)
        const user = new User({
            firstName,
            lastName,
            role,
            email,
            password : hashedPassword
        })
        const savedUser = await user.save()
        res.status(200).json({ status: true, msg: "Added successfully." ,user : { _id: savedUser._id , savedUser : user.email }})
    } catch (e){
        // console.log(e)
        res.status(400).json({ status: false, error: e })
    }
})

// update
router.put('/:userId', verifyToken ,async(req,res) => {
    const { firstName,lastName,role,email } = req.body.user
    try {
        const user = await User.find({ email, _id : { $ne : req.params.userId} })
        if (user.length>0){
            return res.status(400).json({ status: false, msg: 'Email already exist' })
        }
        await User.updateOne({
            _id: req.params.userId },
            { $set : {
                firstName,
                lastName,
                role,
                email,
                } 
        })
        res.status(200).json({ status: true, msg: "Updated successfully."})
        
    } catch(e) {
        res.status(400).json({ status: false, error: e })
    }
})


// delete user
router.delete('/:userId', verifyToken ,async(req,res)=>{
    try {
        const deletedUser = await User.deleteOne({ _id: req.params.userId})
        res.status(200).json({ status: true, user: deletedUser })
    } catch (e){
        res.status(400).json({ status: false, error: e })
    }
})



module.exports= router