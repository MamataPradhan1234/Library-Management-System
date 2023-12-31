const mongoose=require('mongoose');

const userSchema=new  mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    avatar:{
        type:String,
    },
},{
    timestamps:true
});


const User=new mongoose.model('User',userSchema);
module.exports=User;