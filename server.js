const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const path = require("path")
const port = 3000
const ToDo = require("./models/todo")

mongoose.connect('mongodb://localhost/ToDo')

app.use(bodyParser.json())

app.use( '/', express.static(path.resolve(__dirname,'assets')))

app.post("/api/create",async(req,res)=>{
    const record = req.body
    console.log(record);

    await ToDo.create( record )
    res.json({status:'ok'})
})

app.post("/api/modify",async(req,res)=>{
    const {old:oldTitle , new:newTitle } = req.body
    console.log(req.body);
    console.log(oldTitle,newTitle);
    const response = await ToDo.updateOne({ record:oldTitle },{$set:{ record:newTitle }})
    console.log(response);
})

app.post("/api/delete",async(req,res)=>{

    console.log(req.body);
    const {record} = req.body
    const response = await ToDo.deleteOne({ record:record})
    console.log(response);
})

app.get("/api/get", async(req,res)=>{
    const record = await ToDo.find({})
   console.log(record);
   res.json(record)
})

app.get("/",(req,res)=>{
    res.send("to-do")
})

app.listen(port,()=>{
    console.log(`server stated at port${port}`);
})