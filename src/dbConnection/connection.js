const mongoose = require("mongoose");

function dbConnect(){
mongoose.connect(process.env.URI)
.then(()=> console.log("mongoDb is connected"))
.catch((err)=> console.log(err))
}



module.exports={ dbConnect}