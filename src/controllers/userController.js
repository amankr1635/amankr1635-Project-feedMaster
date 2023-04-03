const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const CreateUser = async function(req,res){
try {
        let body = req.body
        if(Object.keys(body).length==0)return res.status(400).send({status:false,message:"Form cann't be Empty"})
        if(!body.name)return res.status(400).send({status:false,message:"Please Enter Your Name"})
        if(!body.phone)return res.status(400).send({status:false,message:"Please Enter Your Phone No"})
        if(!body.email)return res.status(400).send({status:false,message:"Please Enter Your email"})
        if(!body.password)return res.status(400).send({status:false,message:"Please Enter Password"})
    
        let userExist = await userModel.find({$or:[{email:body.email},{phone:body.phone}]})
    
        if(userExist.length>=1){
            if(body.email==userExist[0].email){
                return res.status(400).send({status:false,message:"Email Already Registered"})
            }else{
                return res.status(400).send({status:false,message:"Phone Already Registered"})
            }
        }
        let create = await userModel.create(body)   
        return res.status(201).send({status:true,data:create})
} catch (error) {
    return res.status(500).send({status:false,message:error.message})
}
}



const userLogin = async function(req,res){
try {
    
        let body = req.body
        if(!body)return res.status(400).send({status:false,message:"Form cann't be Empty"})
        if(!(body.email)&&!(body.phone))return res.status(400).send({status:false,message:"Please Enter Your email OR Phone No"})
        if(!body.password)return res.status(400).send({status:false,message:"Please Enter your Password"})
    
        let userCheck = await userModel.findOne({$or:[{email:body.email,password:body.password},{phone:body.phone,password:body.password}]})
        if(!userCheck) return res.status(404).send({status:false,message:"user Not found"})
    
        let token = jwt.sign({userId:userCheck._id},"secrateCodeforLogIn")
        res.setHeader("x-api-key", token);
        return res.status(200).send({status:true,message:"Sucessfully LoggedIn"})
    
} catch (error) {
    return res.status(500).send({status:false,message:error.message})
}
}

module.exports = {CreateUser,userLogin}