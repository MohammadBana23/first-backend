const mongoose = require("mongoose")
const schema = new mongoose.Schema({
    username : {
        type:String,
        required:true,
        unique:true
    },email:{
        type:String,
        required:false,
    },password:{
        type:String,
        required:true
    },createAt:{
        type:Date,
        default:Date.now
    }
})


const user = mongoose.model("users",schema,"users")

module.exports = {user}