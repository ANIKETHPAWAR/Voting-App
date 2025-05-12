const express = require('express');
const app = express();
const db = require('./db')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
require('dotenv').config()
const {jwtAuthMiddleware} = require('./jwt')
let PORT = process.env.PORT || 3000

//importing router files
const userRoutes = require('./routes/userRoutes')
const candidateRoutes = require('./routes/candidateRoutes')

// using imported routes 
app.use('/user',userRoutes);
app.use('/candidate',jwtAuthMiddleware,candidateRoutes);

app.listen(PORT , ()=>{
    return console.log('listen on :' ,PORT)
})