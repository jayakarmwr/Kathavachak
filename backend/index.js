const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
require("dotenv").config();
const approute=require("../backend/Allroutes")
const app=express();

app.use(cors({
    origin: "*", 
    methods: "GET,POST,PUT,DELETE", 
    credentials: true 
  }));


const uri=process.env.MONGO_URI;
mongoose.connect(uri);
const connection=mongoose.connection;
connection.once('open',()=>
{
    console.log("mongodb connected");
})
app.use(express.json());
app.use("/en", approute);


app.listen(3000,()=>
{
    console.log("server is running");
})