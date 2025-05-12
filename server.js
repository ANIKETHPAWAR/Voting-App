const express = require('express');
const app = express();
const db = require('./db')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
require('dotenv').config()
let PORT = process.env.PORT || 3000

//importing router files
const userRoutes = require('./routes/userRoutes')



// using imported routes 
app.use('/user',userRoutes);

app.listen(PORT , ()=>{
    return console.log('listen on :' ,PORT)
})