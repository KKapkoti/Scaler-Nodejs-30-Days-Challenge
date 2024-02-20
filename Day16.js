const express = require('express')
const mongoose = require('mongoose');
const app = express();

const mongoDBURL ="mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.2";

function connectToMongo(){
    mongoose.connect(mongoDBURL);
    const db=mongoose.connection;
    db.on('error', (err) => {
        console.error('connection error:', err);
    });
    db.once('open', () => {
       console.log('connection established successfully');
    });
}
connectToMongo();


app.get('/', (req, res) => {
    console.log("connection established")
});

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
});
