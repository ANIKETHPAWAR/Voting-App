const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
     name: {
        type: String,
        required: true
     },
     age :{
        type: Number,
        required: true
     },
    email:   {
      type: String,
     
     },
    mobile:   {
      type: String,
     },
  aadharNumber:{
        type: Number,
        required: true,
        unique:true
     },
     password: {
        type: String,
        required: true
     },
     role:{
        type:String,
        enum: ['voter','admin'],
        default: 'voter'
     },
    isVoted:{
        type: Boolean,
        default:false
    }

})

//bcrypt hash password 
userSchema.pre('save',async function(next ){
   const user = this; 
   if(!user.isModified('password')){
       return next();
   }
   //// if it returns false, it means password is not modified then it falls in try block
try{
const salt = await bcrypt.genSalt(10);
const hash = await bcrypt.hash(user.password,salt);
user.password = hash;
}catch(err){
    next(err);
}})

/// bcrypt to compare password provided by user with the hashed password stored in the database
userSchema.methods.comparePassword = async function(candidatePassword){
    
    try{
        const isMatch = await bcrypt.compare(candidatePassword,this.password);
        return isMatch;
    }catch(err){
        throw new Error(err);
    }
} 


const User = mongoose.model('User',userSchema);
module.exports = User