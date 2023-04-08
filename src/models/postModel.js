const mongoose =require("mongoose");

const urlSchema = new mongoose.Schema({
    userId : mongoose.Schema.Types.ObjectId,
    title: String,
    author_name: String,
    author_url: String,
    type:String,
    height:String,
    width:String,
    version:String,
    provider_name: String,
    provider_url:String,
    thumbnail_height:String,
    thumbnail_width:String,
    thumbnail_url: String,
    html : String
  },{timestamps:true});

module.exports = mongoose.model("urlData",urlSchema)