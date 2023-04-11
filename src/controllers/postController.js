const postModel = require("../models/postModel");
const userModel = require("../models/userModel");
const ogs = require("open-graph-scraper");
const { URL } = require("url");
const axios = require("axios");

const createPost = async function (req, res) {
  try {
    let userId = req.decodedToken.userId;
    let url = req.body.url;
    if (url == "")
      return res
        .status(400)
        .send({ status: false, message: "url cannot be empty" });

    let oembedUrl = "";
    let parsedUrl = new URL(url);

    function getOembededUrl(parsedUrl) {
      if (parsedUrl.hostname == "youtu.be") {
        oembedUrl = `https://www.youtube.com/oembed?url=${url}&format=json`;
      } else if (parsedUrl.hostname == "open.spotify.com") {
        oembedUrl = `https://open.spotify.com/oembed?url=${url}&format=json`;
      } else if (parsedUrl.hostname == "twitter.com") {
        oembedUrl = `https://publish.twitter.com/oembed?url=${url}`;
      } else {
        oembedUrl = "";
      }
      return oembedUrl;
    }
    async function getOgUrl(url) {
      try {
        const options = { url };
        const data = await ogs(options);
        const { error, result } = data;
        if (error) {
          throw error;
        } else {
          return result;
        }
      } catch (error) {
        throw error;
      }
    }
    
    let oembededUrl = getOembededUrl(parsedUrl);
    let obj = {userId:userId};
    if (oembededUrl) {
      let checkUrl = await axios.get(oembededUrl);
      obj = { ...obj, ...checkUrl.data };
    } else {
      let ogData = await getOgUrl(url);
      obj = {...obj,...ogData}
    }
    let create = await postModel.create(obj);

    return res
      .status(201)
      .send({ status: true, message: "postCreated", data: create });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};


const getUserPost = async function(req, res) {
  try {
    let userId = req.decodedToken.userId
  
    let allPostForUser = await postModel.find({userId: userId,isDeleted:false})
    if(allPostForUser.length === 0) return res.status(404).send({status: false, message: "No posts found"})
  
    return res.status(200).send({status: true, data: allPostForUser})
  } catch (error) {
    return res.status(500).send({status: false, message: error.message})
  }
}

const getPostData = async function(req,res){
  try {
    let userId = req.query.userId
    if(!userId){
      let allData = await postModel.find({isDeleted:false})
      return res.status(200).send({status:true,data:allData})
    }
    else{
      let dataFromQuery = await postModel.find({userId : userId,isDeleted:false})
      if(!dataFromQuery)return res.status(404).send({status:false,message:"No Post Found"})
      return res.status(200).send({status:true,data:dataFromQuery})
    }
        
} catch (error) {
  return res.status(500).send({status:false,message:error.message})
}
}


const deletePost = async function (req, res) {
  try {
    let params = req.params;
    let userId = req.decodedToken.userId;

    let postCheck = await postModel.findOne({
      _id: params.postId,
      isDeleted: false,
    });
    if (!postCheck)
      return res
        .status(404)
        .send({ status: false, message: "Post already deleted" });
    if (userId != postCheck.userId)
      return res.status(401).send({ status: "you are not Authorised" });
    await postModel.findOneAndUpdate(
      { _id: params.postId },
      { isDeleted: true },
      // {new:true}
    );
    return res
      .status(200)
      .send({ status: false, message: "post Deleted Sucessfully" });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { createPost, deletePost ,getUserPost,getPostData};
