const express = require('express')
const mongoose = require('mongoose')
const app = express();
require ('dotenv/config')


// Middlewares
// app.use('/posts', () =>{
//     console.log('middle ware')
// })
app.use(express.json());


// import routes
const userRoutes = require('./routes/users')
const petRoutes = require('./routes/pets')
app.use('/users', userRoutes)
app.use('/pets', petRoutes)
// app.use('/pets', petRoutes)

// Routes
app.get('/', (req,res)=>{
    res.send('We are on home')
})

app.get('/posts', (req,res) => {
    res.send('We are on posts')
})


// connect to db
mongoose.connect(process.env.DB_CONNECTION,
    {useNewUrlParser: true,useUnifiedTopology: true },
        () => console.log('connected to db')
)

// Listen
app.listen(3000)