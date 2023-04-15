const mongoose =require("mongoose");

const urlSchema = new mongoose.Schema({
    userId : {
      type:mongoose.Schema.Types.ObjectId,
      ref: "userData"
    },
    title: String,
    url:String,
    author_name: String,
    author_url: String,
    type:String,
    height:String,
    width:String,
    version:String,
    provider_name: String,
    html : String,
    ogTitle:String,
    requestUrl:String,
    ogDescription:String,
    ogUrl:String,
    ogImage:{
      type:{
        type:String
      },
      url:String
    },
    isDeleted:{
      type:Boolean,
      default: false
    }
  },{timestamps:true});

module.exports = mongoose.model("postData",urlSchema)