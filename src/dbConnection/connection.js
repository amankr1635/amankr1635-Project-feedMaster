const mongoose = require("mongoose");

function dbConnect(){
    const uri =process.env.mongo_Url
mongoose.connect(uri)
.then(()=> console.log("mongoDb is connected"))
.catch((err)=> console.log(err))
}



module.exports={ dbConnect}