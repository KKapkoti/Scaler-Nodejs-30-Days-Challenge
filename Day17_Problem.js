const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 6000;

//connection
mongoose.connect("mongodb://127.0.0.1:27017/learn_node")

//Schema
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
});

//models
const User = mongoose.model('User', userSchema);

async function addUserToDatabase(user) {
    try {
      const newUser = new User(user);
      await newUser.save();
      console.log('connection successful to Db');
    } catch (error) {
      console.error('database connection error:', error);
    }
  }
  
addUserToDatabase({ username: 'john_doe', email: 'john@example.com' });

app.listen(PORT, () => {
      console.log(`Server is running at port: ${PORT}`);
});