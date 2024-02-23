const express = require('express');
const mongoose = require('mongoose')

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/productDatabase')
.then(() => console.log("database connection successful"))
.catch((err) => console.error("connection error: ", err))

//schemas
const productSchema= new mongoose.Schema({
        name: {
            type:String,
            required: true,
        },
        price: {
            type:String,
            required: true,
        },
        quantity: {
            type:Number,
            required: true,
        },
        publishedDate: {
            type:Date, 
            default: Date.now
        },
});

//models
const Product = mongoose.model("Product", productSchema)


//Creates a new product in MongoDB---------------------------------
async function createProduct(){
    const product = new Product({
        name: 'Earbirds',
        price: '2000',
        quantity: 5,
        isPublished: true
    });

    const result = await product.save()
    console.log(result)
}
createProduct();

//Retrieves all products from MongoDB-----------------------------
async function getAllProducts(){
    const Products = await Product.find()
    console.log(Products)
}
getAllProducts();

//Updates a product in MongoDB------------------------------------
async function updateProduct(id){
    let product = await Product.findById(id)
    if(!product) return;
    product.name= 'EarPhones'
    product.price = '3000'
    const updatedProduct = await product.save()
    console.log(updatedProduct)
}
updateProduct('65d6f752e196e2eaa0029512');what


//Deletes a product from MongoDB--------------------------------
async function deleteProduct(id){
        let product = await Product.findByIdAndDelete(id)
        console.log(product)
}
deleteProduct('65d6f752e196e2eaa0029512');




