const express = require('express');
const mongoose = require('mongoose')

const app = express()
const PORT=8000;

mongoose.connect('mongodb://127.0.0.1:27017/day20DB')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

//Schema
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    age:{
        type:Number,
        require:true,
    },
});

//models
const User = mongoose.model('User', userSchema);

// Route 
app.get('/average-age', async (req, res) => {
try {
const result = await User.aggregate([
    {
        $group: {
            _id: null,
            averageAge: { $avg: '$age' }
        }
        }
]);

res.json(result);
} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'An error occurred' });
}
});


app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
});