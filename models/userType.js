const mongoose=require('mongoose');

const userTypeSchema=new mongoose.Schema({
    userType:{
         type:String,
         required:true,
    },
},{
   timestamps:true,
});

const UserType=new mongoose.model('UserType',userTypeSchema);
module.exports=UserType;