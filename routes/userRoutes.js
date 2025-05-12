const express = require('express');
const router = express.Router()
const User = require('./../models/user')
const {jwtAuthMiddleware,generateToken} = require('./../jwt')

/// signup token
router.post('/signup',async (req,res)=>{
    try{
    const data = req.body
 if(data.role === "admin"){
const existingAdmin = await User.findOne({role:"admin"});
if(existingAdmin){
    return res.status(500).json('An admin already exists')
}

 }
 if(data.age < 18){
    return res.status(500).json('You must be 18+ to vote')
 }


    const newUser =new User(data);
    
    const savedUser=await newUser.save()
    console.log('data saved');

    // generating new token
const payLoad ={
  id: savedUser.id,
 
}
const token = generateToken(payLoad);
console.log('your token is :' ,token);
    res.status(200).json({savedUser,token : token})
    }catch(err){
    console.log(err);
    res.status(500).json({error: 'internal error'})
    }
    
     })
/// login routes token 

router.post('/login',async (req,res)=>{


try{
const {aadharNumber,password} = req.body;

const user = await User.findOne({aadharNumber:aadharNumber});

if(!user || !(await user.comparePassword(password))){
return response.status(401).json({error: 'user didnt match'})
}

const payLoad = {
  id :user.id,
  

}

const token = generateToken(payLoad);
res.json({token})


}
catch(err){
console.error(err);
res.status(500).json({error: 'interal server error'})
}

})
//// protected routes 


    router.get('/profile',jwtAuthMiddleware,async(req,res)=>{
      try{
const userData = req.user;
      const userId = userData.id
const user = await User.findById(userId)
console.log('user found')
res.status(200).json(user )
      }
      catch(err){
console.error(err);
          res.status(500).json({error:'internal error'})
          
      }

    })  


router.put('/profile/password',async(req,res)=>{
  try{
const  newId = req.user.id;
const {currentPassword,newPassword} = req.body
const Response = await User.findById(newId);
if(!(await Response.comparePassword(currentPassword))){
return res.status(401).json({error: 'user didnt match'})
}
// password matches then
Response.password = newPassword;
await Response.save();

res.status(200).json({message:'Password Updated!!'});
console.log('data updated')
if(!Response){
  return res.status(404).json({error:'not found'})
}
  }catch(err){
    console.log(err);
    res.status(500).json({error:'internal error'})

  }
})

module.exports = router;
