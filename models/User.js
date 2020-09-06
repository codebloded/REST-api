const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        min:10,
        required:true
    },
    about:{
        type:String,

        required:true

    },
    date:{
        type:Date,
        default:Date.now,

    }
})

const User = mongoose.model("User", userSchema);
module.exports = User;