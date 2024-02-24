const express = require('express');
const mongoose = require('mongoose')

const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/day24DB')
.then(() => console.log("database connection successful"))
.catch((err) => console.error("connection error: ", err))


const productSchema= new mongoose.Schema({
    name: {type:String, required: true},
    price: {type:Number, required:true},
    category: {type:String, required: true,},
    publishedDate: {type:Date, default: Date.now},
});

//models
const Product = mongoose.model("Product", productSchema);


app.post('/api/products', async (req, res) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    });
    try {
        const savedProduct = await product.save();
        res.send(savedProduct);
      } catch (error) {
        res.status(400).send(error);
      }
});


app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.send(products);
      } catch (error) {
        res.status(500).send(error);
      }
});


app.put('/api/products/:id', async(req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, {
          name: req.body.name,
          price: req.body.price,
          category: req.body.category
        }, { new: true });
    
        if (!product) return res.status(404).send('The product with the given ID was not found.');
    
        res.send(product);
      } catch (error) {
        res.status(400).send(error);
      }
});


app.delete('/api/products/:id', async(req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).send('The product with the given ID was not found.');
    
        res.send(product);
      } catch (error) {
        res.status(500).send(error);
      }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
