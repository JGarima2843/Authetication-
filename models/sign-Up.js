const mongoose=require('mongoose');
// const { Schema } = mongoose;

const userSchema=new mongoose.Schema({


    email:{
        type:String,
        required: true,
        unique:true
    },

    location:{
        type:String,
        required: true,

    },

    url:{
        type:String,
        required: true,
        unique:true
    },

    password:{
        type:String,
        required: true
    }


},{timestamps:true});

const User=mongoose.model('User',userSchema);

module.exports=User;