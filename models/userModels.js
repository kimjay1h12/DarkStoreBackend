const db = require("mongoose")
const userScheme = new db.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    isVerified:{
        type:Boolean,
        required:true
    },
    isAdmin:{
        type:Boolean,
        required:true
    },
    location:{
        type:Object,
        required:true,
    },
    phoneNumber:{
        type:Number,
        required:true
    }
})
const User = db.model("User",userScheme)
module.exports = User