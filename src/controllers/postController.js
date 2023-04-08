const postModel = require("../models/postModel");
const {URL} = require("url");
const axios = require("axios");


const createPost =async function(req,res){
try {
        let userId = req.decodedToken.userId
        let url = req.body.url
        if(url=="")return res.status(400).send({status:false,message:"url cannot be empty"})
        // let isValidUrl = await axios.get(url)
        // if(!isValidUrl)return res.status(400).send({status:false,message:"enter a valid url"})

        let oembedUrl =""
        let parsedUrl = new URL(url)
        if(parsedUrl.hostname=="youtu.be"){
            oembedUrl = `https://www.youtube.com/oembed?url=${url}&format=json`;
        }
        else if (parsedUrl.hostname=="open.spotify.com") {
            oembedUrl = `https://open.spotify.com/oembed?url=${url}&format=json`;
        }
      else if (parsedUrl.hostname == "twitter.com") {
            oembedUrl = `https://publish.twitter.com/oembed?url=${url}`;
        // else if (parsedUrl.hostname === 'twitter.com') {
        // // Use the generic oEmbed API endpoint instead of twitter specific endpoint
        // oembedUrl = `https://noembed.com/embed?url=${url}&format=json`;
      } else {
        // Use the generic oEmbed API endpoint
        oembedUrl = `https://noembed.com/embed?url=${url}&format=json`;
      }
        //   } else {
        //     oembedUrl = `https://oembed.com/providers.json?url=${url}&format=json`;
        //   }
        // else if(parsedUrl.hostname=="twitter.com"){
        //     oembedUrl = `https://publish.twitter.com/oembed?url=${url}`;
        // }
        // else {
        //     // i am having issue here when i am giving url of some different website which is not defined in my code i find this url but it is not working
        //     // oembedUrl = `https://oembed.com/providers.json?url=${url}&format=json`;
        //     oembedUrl= `${url}`
        // }
        let checkUrl = await axios.get(oembedUrl)
      
        let obj =({userId:userId,...checkUrl.data})
        let create = await postModel.create(obj)
        
        return res.status(201).send({status:true,message:"postCreated",data:create})    
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