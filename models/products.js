const mongoose = require("mongoose")
const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },price:{
        type:Number,
        required:true
    },brand:{
        type:String,
        required:false
    },createdAt:{
        type:Date,
        default:Date.now
    }
})

const product = mongoose.model("products",schema,"products")

module.exports = {product}