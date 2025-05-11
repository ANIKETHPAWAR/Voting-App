const express = require('express');
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json())
require('dotenv').config()
let PORT = process.env.PORT || 3000
app.listen(PORT , ()=>{
    return console.log('listen on :' ,PORT)
})