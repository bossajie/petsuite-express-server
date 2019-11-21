const express = require('express')
const router = express.Router()
const Pet = require('../models/Pet')

// pet list
router.get('/', async(req,res) => {
    try {
        console.log('sds')
        const pets = await Pet.find().populate('owner')
        res.status(200).json({ status: true, pets })
    } catch (e){
        res.status(400).json({ status: false, msg: e })
    }
})

// add pet
router.post('/', async(req,res) => {
    try{
        const { name,breed,size,owner } = req.body
        const pet = new Pet({
            name,
            breed,
            size,
            owner: owner._id
        })
        const savedPet = await pet.save()
        res.status(200).json({ status: true, pet: savedPet })
    } catch (e){
        res.status(400).json({ status: false, msg: e })
    }
})



module.exports = router