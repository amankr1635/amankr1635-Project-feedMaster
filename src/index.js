const express = require("express");
const mongoose = require("mongoose");
const route = require("./routes/routes");
const cors = require("cors")
require("dotenv").config()
const app =express()
app.use(cors())

app.use(express.json())

mongoose.connect(process.env.mongo_Url)
.then(()=> console.log("mongoDb is connected"))
.catch((err)=> console.log(err))

app.use("/",route)

app.listen(process.env.port,()=>{
    console.log("server is running on port",`${process.env.port}`)
})