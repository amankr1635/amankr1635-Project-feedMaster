const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const authentication = async function(req,res,next){
    try {
        if(!req.headers.authorization)return res.status(400).send({status:false,message:"please enter token in Bearer"})
        let token = req.headers.authorization.split(" ")[1]
    
        jwt.verify(token ,"secrateCodeforLogIn",(err,decodedToken)=>{
            if(err)return res.status(400).send({status:false,message:err.message})
            else{
                req.decodedToken=decodedToken
                next()
            }
        });
        
    } catch (error) {
        return res.status(500).send({status:false,message:error.message})
    }
}

const authorization = async function(req,res,next){
try {
        let userId = req.decodedToken.userId
        // let params = req.params
        console.log("i m from auth")
        // if(!params)return res.status(400).send({status:false,message:"provide userID in params"})
        // let userCheck = await userModel.findOne({_id:params.userId})
        // if(!userCheck)return res.status(404).send({status:false,message:"No userExist"})

        // if(userId != userCheck.userId) return res.status(401).send({status:false,message:"You are not authorised"})
        next()
} catch (error) {
    return res.status(500).send({status:false,message:error.message})
}
}


module.exports = {authentication,authorization}