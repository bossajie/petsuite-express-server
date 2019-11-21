const mongoose = require('mongoose')

const PetSchema = mongoose.Schema({
    name: String,
    type: String,
    breed: String,
    size : String,
    owner : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
    created_at: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Pets',PetSchema)