const {ObjectId}=require("mongodb");
const mongoose=require("mongoose");

userSchema=new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    isConfirmed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});
userSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 });

const User=mongoose.model('user',userSchema);
module.exports={User};
