const express = require('express');
const mongoose = require('mongoose')

const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/day25DB')
.then(() => console.log("database connection successful"))
.catch((err) => console.error("connection error: ", err))


const productSchema= new mongoose.Schema({
    name: {type:String, required: true},
    publishedDate: {type:Date, default: Date.now},
});

const Product = mongoose.model("Product", productSchema);

async function createProductNameIndex(){
    try{     
         await Product.createIndexes({name:1});
        console.log("Index created successfully")
    }catch(err){
            console.error(err.message)
    }
}
createProductNameIndex();


const PORT =3000;
app.listen(PORT, () =>{
    console.log(`listening on port ${PORT}`);
})