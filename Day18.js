const express = require('express');
const mongoose = require('mongoose');

const app = express();

//connection
mongoose.connect("mongodb://127.0.0.1:27017/learn_node_Day18")

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

async function addToDatabase(user) {
    try {
      const newUser = new User(user);
      await newUser.save();
      console.log('connection successful to Db');
    } catch (error) {
      console.error('database connection error:', error);
    }
  }

addToDatabase();

// Route to get all users
app.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      console.log('Users fetched from the database');
      res.json(users);
    } catch (error) {
      console.error('Error fetching users from the database:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
