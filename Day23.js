const express = require('express');
const mongoose = require('mongoose')

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/day23DB')
.then(() => console.log("database connection successful"))
.catch((err) => console.error("connection error: ", err))


const productWithCategorySchema= new mongoose.Schema({
    name: {type:String, required: true},
    price: {type:Number, required:true},
    category: {
        type:String, 
        required: true,
        enum: ['electronics', 'homeAppliances', 'clothes', 'books']   
    },
    publishedDate: {type:Date, default: Date.now},
});

//models
const ProductWithCategory = mongoose.model("ProductWithCategory", productWithCategorySchema);


async function createProductWithCategory(){
    const product = new ProductWithCategory({
        name: 'novel',
        price: 500,
        category:'books',
    });

    try{     
        const result = await product.save()
        console.log(result)
    }catch(err){
            console.error(err.message)
    }
}

createProductWithCategory();


async function getProductWithCategory(){
    const products = await ProductWithCategory.find({category: 'electronics'})
    console.log(products)
}

getProductWithCategory();

