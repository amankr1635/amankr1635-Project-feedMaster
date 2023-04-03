const express =require("express");
const router = express.Router()
const {CreateUser,userLogin} = require("../controllers/userController");
const {createPost,deletePost} =require("../controllers/postController");
const {authentication,authorization} =require("../middleware/middleware");

router.get("/test-me",(req,res)=>{
    return res.send({message:"my first api"})
})

router.post("/signUp",  CreateUser);
router.post("/login",userLogin);
console.log("from routes")
router.post("/post",authentication,authorization ,createPost);

 // from where do i get userID from params or body for creation of post and authorization.
// oembed in backend save ombed code in db while creating post
router.delete("/postDelete/:postId",authentication, deletePost);



module.exports = router