const mongoose = require('mongoose')

const userSchema =  new  mongoose.Schema({

    name : {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: [true , "Please enter your password!"]
        
    },
     role: {
        type: Number,
        default: 0 // 0 = user , 1 = admin
        
    },
    profilePicture : {
        type: String,
        default: "default-avatar.png"
        
    },
    profileId:{
        type: String,
        unique: true,
    },address:{
        type:String,
        required: false
    },
    city:{
        type: String,
        required: false,
    },
    country:{
        type:String,
        required:false,
    },
    postalCode:{
        type:Number,
        required:false,
    },
    bio:{
        type:String,
        required:false,
    },
    facebook:{
        type:String,
        required:false
    },
    twitter:{
        type:String,
        required:false
    },
    linkedin:{
        type:String,
        required:false
    },
    accounttype:{
        type:String,
        required:true
    },


}, {
    timestamps: true
})

module.exports = mongoose.model("Users", userSchema)