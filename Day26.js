const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/day26DB')
.then(() => console.log("database connection successful"))
.catch((err) => console.error("connection error: ", err))


const Product = mongoose.model('Product', new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number
}));

async function insertSampleProducts() {
    try {
        await Product.insertMany([
            { name: "Product 1", price: 10, quantity: 5 },
            { name: "Product 2", price: 20, quantity: 3 },
            { name: "Product 3", price: 15, quantity: 7 }
     ]);
        console.log("Sample products inserted successfully");
    } catch (err) {
        console.error("Error inserting sample products:", err);
   }
}
insertSampleProducts();
  
async function getProductStatistics() {
    try {      
    const result = await Product.aggregate([
        {
          $group: {
            _id: null,
            totalProducts: { $sum: 1 },
            averagePrice: { $avg: "$price" },
            highestQuantity: { $max: "$quantity" }
          }
        }
      ]);

    console.log("Pipeline:", JSON.stringify(result));

    if (result.length === 0) {
      throw new Error("No products found");
    }
    return result[0];
  } catch (err) {
    console.error(err);
  }
}

getProductStatistics().then(statistics => {
    console.log(statistics);
}).catch(err => {
    console.error(err);
});