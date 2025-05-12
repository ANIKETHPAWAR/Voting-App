const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI).then(()=>{
    console.log ('MongoDB connected!')
})

const db = mongoose.connection;

db.on('connected',()=>{
    console.log('connected');  
 });
 db.on('disconnected',()=>{
    console.log('disconnected');

 });
 db.on('error',(err)=>{
    console.log('error:',err)
 });

 module.exports = db