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
        const { name,breed,size,owner,type } = req.body
        const pet = new Pet({
            name,
            breed,
            size,
            type,
            owner: owner._id
        })
        const savedPet = await pet.save()
        res.status(200).json({ status: true, pet: savedPet })
    } catch (e){
        res.status(400).json({ status: false, msg: e })
    }
})

// specific pet show
router.get('/:petId', async (req,res)=>{
    try {
        const pet = await Pet.findById(req.params.petId).populate('owner')
        res.status(200).json({ status: true, pet})
    } catch (e){
        res.status(400).json({ status: false, msg: e })
    }
})

// edit pet
router.patch('/:petId', async (req,res) =>{
    const { name,breed,size,type,owner } = req.body
    try{
        const updatedPet = await Pet.updateOne(
            { _id : req.params.petId},
            { 
                $set : {
                    name,
                    breed,
                    type,
                    size,
                    owner: { _id : owner._id }
                }
            }
            )
        res.status(200).json({ status: true, pet : updatedPet })
    } catch (e) {
        res.status(400).json({ status: false, msg: e })
    }

})



module.exports = router