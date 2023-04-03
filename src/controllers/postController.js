const postModel = require("../models/postModel");
const axios = require("axios");


const createPost =async function(req,res){
try {
        let body = req.body
        let url =""
        if(Object.keys(body).includes("youtube")){
            url = `https://www.youtube.com/oembed?url=${body.youtube}&format=json`;
        }
        else if (Object.keys(body).includes("spotify")) {
            url = `https://open.spotify.com/oembed?url=${body.sportify}&format=json`;
        }
        else if(Object.keys(body).includes("twitter")){
            url = `https://publish.twitter.com/oembed?url=${body.twitter}`;
        }
        let data = await axios.get(url)
        const newUrl = ({
            url,
            title: data.title,
            author_name: data.author_name,
            provider_name: data.provider_name,
            thumbnail_url: data.thumbnail_url
          });
        let create = await postModel.create(newUrl)
        
        return res.status(201).send({status:false,data:create})    
} catch (error) {
    return res.status(500).send({status:false,message:error.message})
}
}


const deletePost =async function(req,res){
try {
        let params = req.params
        let userId = req.decodedToken.userId

        let postCheck = await postModel.findOne({_id:params.postId,isDeleted:false})
        if(!postCheck)return res.status(404).send({status:false,message:"Post already deleted"})
        if(userId!=postCheck.userId)return res.status(401).send({status:"you are not Authorised"})
        await postModel.findOneAndUpdate({_id:params.postId},{isDeleted:true})
        return res.status(200).send({status:false,message:"post Deleted Sucessfully"})    
} catch (error) {
    return res.status(500).send({status:false,message:error.message})
}
}



module.exports = {createPost,deletePost}