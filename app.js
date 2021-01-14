const express = require("express")
const mongoose = require("mongoose")
const app = express()
const {user} = require("./models/user")
const {product} = require("./models/products")
app.use(express.json())
mongoose.connect("mongodb://localhost:27017/onlineshop",{useNewUrlParser : true,autoIndex:false},
    (err)=>{
    if(!err)
        console.log("connect to my db...")
        else
        console.log(err.message)
})

app.post("/api/v1/user/signup",(req,res) =>{
    const username = req.body["username"]
    const email = req.body["email"]
    const password = req.body["password"]

    const newUser = {
        username : username,
        password:password,
        email:email
    }

    user.create(newUser).then(response=>{
        console.log(response)
        res.status(201).send({
            message:"user created..."
        })
    }).catch(err=>{
        console.log(err.message)
        res.status(404).send({
            message:"back end am error dad"
        })
    })
})

app.post("/api/v1/product/insert",(req,res)=>{
    const name = req.body["name"]
    const price = req.body["price"]
    const brand = req.body["brand"]

    const newProduct = {
        name:name,
        price:price,
        brand:brand
    }

    product.create(newProduct).then(response => {
        res.status(201).send({message:"add new product"})
    }).catch(err => {
        res.status(404).send({message:"product can't created"})
    })
})

app.post("/api/v1/user/login",(req,res)=>{
    const username = req.body['username']
    const password = req.body['password']

    user.findOne({username:username,password:password}).then(response => {
        if (response != null){
            res.status(200).send(response)
        }else
            res.status(404).send({"message":"username or password is wrong"})
    })
})

app.post("/api/v1/product/get/name&price",(req,res)=>{
    const name = req.body['name']
    const price = req.body['price']

    product.find({name:name,price:price}).then(response => {
        if (response != null){
            res.status(200).send(response)
        }else
            res.status(404).send({"message":"name or price not exist"})
    })
})

app.post("/api/v1/product/get/brand",(req,res)=>{
    const brand = req.body['brand']

    product.find({brand:brand}).then(response => {
        if (response != null){
            res.status(200).send(response)
        }else
            res.status(404).send({"message":"this brand not exist"})
    })
})


app.listen(9800,(err)=>{
    if (!err)
        console.log("run on port 9800")
    else
        console.log("run error")
})