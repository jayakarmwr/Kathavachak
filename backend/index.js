import express from 'express';
import mongoose from 'mongoose';
require("dotenv").config();
const app=express();
const uri=process.env.MONGO_URI;
mongoose.connect(uri);
const connection=mongoose.connection;
connection.once()

app.listen(3000,()=>
{
    console.log("server is running");
})