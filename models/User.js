const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    firstname : String,
    lastname : String,
    email : {
        required: true,
        type: String
    },
    password: {
        requied: true,
        type: String
    },
    role : {
        required: true,
        type: String
    }
})

// collecction name = "users"
module.exports = mongoose.model('Users', UserSchema)