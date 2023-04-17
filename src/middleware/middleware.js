const jwt = require("jsonwebtoken");

const authentication = async function(req,res,next){
    try {
        let token = req.headers.authorization.split(" ")[1]

        jwt.verify(token ,`${process.env.secrateKey}`,(err,decodedToken)=>{
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

module.exports = {authentication}