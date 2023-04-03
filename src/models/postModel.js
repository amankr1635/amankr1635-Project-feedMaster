const mongoose =require("mongoose");

// const linksData = new mongoose.Schema({
//     userId:{
//         type:mongoose.Schema.Types.ObjectId,
//         required:true
//     },
//     youtube:{
//         type:String
//     },
//     twitter:{
//         type:String
//     },
//     faceBook:{
//         type:String
//     },
//     isDeleted:{
//         type:Boolean,
//         default:false
//     }
// },{timestamps:true})

const urlSchema = new mongoose.Schema({
    url: String,
    title: String,
    author_name: String,
    provider_name: String,
    thumbnail_url: String
  });

// module.exports = mongoose.model("linksData",linksData)
module.exports = mongoose.model("urlData",urlSchema)