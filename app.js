const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require ('dotenv/config')
const app = express();


// Middlewares
app.use(cors())
app.use(express.json())

// import routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/users')
const petRoutes = require('./routes/pets')
app.use('/api/', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/pets', petRoutes)

app.get('/api', (req,res)=>{
    res.send('We are on home')
})



// connect to db
mongoose.connect(process.env.DB_CONNECTION,
    {useNewUrlParser: true,useUnifiedTopology: true },
        () => console.log('connected to db')
)

// Listen
app.listen(3000)