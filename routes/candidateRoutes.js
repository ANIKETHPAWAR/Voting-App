const express = require('express');
const router = express.Router()
const candidate = require('./../models/candidate')
const User = require('./../models/user')
const {jwtAuthMiddleware,generateToken} = require('./../jwt')


// function to check admin role
const checkAdmin = async (userID)=>{
    try{
const user = await User.findById(userID);
if(user.role === 'admin'){
    return true
}

    }
catch(err){
    return false;
}
}







/// Post route to add candidate
router.post('/',async (req,res)=>{
    try{
    if(! await checkAdmin(req.user.id)){
        return res.status(403).json('You are not an admin');
    }
    const data = req.body
    const newCandidate =new candidate(data);
    
    const savedCandidate=await newCandidate.save()
    console.log('data saved');
    res.status(200).json({savedCandidate})
    }catch(err){
    console.log(err);
    res.status(500).json({error: 'internal error'})
    }
    
     })


// candidate update route
     router.put('/:candidateId',async(req,res)=>{
  try{

 if(!checkAdmin(req.user.id)){
        return res.status(403).json('You are not an admin');
    }



const  candidateId = req.params.candidateId;
const updateCandidate = req.body
const reponse = await candidate.findByIdAndUpdate(candidateId,updateCandidate,{
  new:true,
  runValidators:true

 
})
res.status(200).json(reponse);
console.log('Candidate data updated')
if(!reponse){
  return res.status(404).json({error:'Candidate not found'})
}
  }catch(err){
    console.log(err);
    res.status(500).json({error:'internal error'})

  }
})

// route to delete candidate by  admin 
 router.delete('/:candidateId',async(req,res)=>{
  try{

 if(!checkAdmin(req.user.id)){
        return res.status(403).json('You are not an admin');
    }



const  delCandidateId = req.params.candidateId;
const deletedReponse = await candidate.findByIdAndDelete(delCandidateId)

res.status(200).json(deletedReponse);
console.log('Candidate data deleted Succesfully!!')
if(!deletedReponse){
  return res.status(404).json({error:'Candidate not found'})
}
  }catch(err){
    console.log(err);
    res.status(500).json({error:'internal error'})

  }
})












     module.exports = router