const jwt = require('jsonwebtoken');

//creating middleware function
const jwtAuthMiddleware = (req,res,next)=>{
//checking if headers has autorixation
const authorization = req.headers.authorization;
if(!authorization){
    return res.status(401).json("Error token not present ")
}

    // jwt token extraction from request headers
    const token = req.headers.authorization.split(' ')[1];
    if(!token){
        return res.status(401).json({error:"unauthorized"});
    }
    try{
        // when we get token and we will verify now
const decodedValue = jwt.verify(token,process.env.JWT_SECRET);

req.user = decodedValue
next();


    }
catch(err){
    console.log(err);
    res.status(401).json({error:'invalid token'})
}


}
/// function to generate JWT
const generateToken = (userData)=>{
    // generate new jwt token using user data
    return jwt.sign(userData,process.env.JWT_SECRET);
}











module.exports = {jwtAuthMiddleware,generateToken}