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

app.get('/', (req, res) => {
    res.send('Welcome to the backend of voting application. Users can test the endpoints using Postman. Check out the project on GitHub: https://github.com/ANIKETHPAWAR/Voting-App/blob/main/README.md')
});

// using imported routes 
app.use('/user',userRoutes);
app.use('/candidate',jwtAuthMiddleware,candidateRoutes);

app.listen(PORT , ()=>{
    return console.log('listen on :' ,PORT)
})