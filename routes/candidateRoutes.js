const express = require('express');
const router = express.Router()
const candidate = require('./../models/candidate')
const User = require('./../models/user')
const {jwtAuthMiddleware,generateToken} = require('./../jwt');
const Candidate = require('./../models/candidate');


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


// route for candidates list
router.get('/list',async(req,res)=>{
try{
const candidateList = await Candidate.find();

const candidateShow = candidateList.map((data)=>{ 
    return {
        candidateName:data.name,
        age:data.age,
        party:data.party,


    }
})
res.status(200).json(candidateShow);

}
catch(err){
     console.log(err);
    res.status(500).json({error:'internal error'})

}


})

 /// for voting

router.post('/vote/:candidateID', async(req,res)=>{


   const  candidateID = req.params.candidateID;
  const  userID = req.user.id;
try{
    const candidate = await Candidate.findById(candidateID);
    if(!candidate){
        return res.status(404).json('Candidate not found');

    }
    const user = await User.findById(userID);
    if(!user){
        return res.status(404).json('User  not found');

    }
    if(user.isVoted){
        return res.status(400).json({message : 'You have already voted'})
    }
      if(user.role ==='admin'){
        return res.status(400).json({message : 'Admin is not allowed to vote'})
    }

 /// casting of vote to a candidate logic
 candidate.votes.push({user: userID});
 candidate.voteCount++;
 await candidate.save();

 // user logic
user.isVoted = true;
await user.save();

res.status(200).json({message:'Vote recorded successfully'})

}catch(err){
  console.log(err);
    res.status(500).json({error:'internal error'})
}

})

/// route for vote counts
router.get('/vote/count',async (req,res)=>{
    try{
const candidate = await Candidate.find().sort({voteCount:'desc'})

const voteRecord = candidate.map((data)=>{
    return {
        party: data.party,
        count: data.voteCount
    }
})

res.status(200).json(voteRecord);



    }catch(err){
  console.log(err);
    res.status(500).json({error:'internal error'})
}
})







     module.exports = router