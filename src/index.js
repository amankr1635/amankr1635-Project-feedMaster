const express = require("express");
const mongoose = require("mongoose");
const route = require("./routes/routes");
const app =express()

app.use(express.json())

mongoose.connect("mongodb+srv://amankr1635:ZOOTSxWCMvv5xP1H@cluster0.lrsbq7y.mongodb.net/projectFeedMaster")
.then(()=> console.log("mongoDb is connected"))
.catch((err)=> console.log(err))

app.use("/",route)

app.listen(3000,()=>{
    console.log("server is running on port ",3000)
})