const express =require("express");
const router = express.Router()
const {CreateUser,userLogin} = require("../controllers/userController");
const {createPost,getUserPost,getPostData,deletePost} =require("../controllers/postController");
const {authentication} =require("../middleware/middleware");

router.get("/test-me",(req,res)=>{
    return res.send({message:"my first api"})
})

router.post("/signUp",  CreateUser);
router.post("/login",userLogin);
router.post("/post",authentication,createPost);
router.get("/myPosts/:userId",authentication,getUserPost);
router.get("/allPost",getPostData);
router.delete("/post/:postId",authentication, deletePost);

router.all("/*",function(req,res){
    res.status(400).send({status : false, message:"invalid http request"})
})



module.exports = router