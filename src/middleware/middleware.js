const jwt = require("jsonwebtoken");

const authentication = async function(req,res,next){
    try {
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


// const authorization = async function(req,res,next){
//     let userId = req.params.userId

// }





module.exports = {authentication}