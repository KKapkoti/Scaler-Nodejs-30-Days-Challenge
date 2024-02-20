const express = require('express');
const mongoose = require('mongoose')

const app = express();
const PORT=3000;

mongoose.connect("mongodb://127.0.0.1:27017/database")

//Schema
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        validate:{
            validator: function(value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
              },
              message: props => `${props.value} is not a valid email address!`
        }
    }
});


//models
const User = mongoose.model('User', userSchema);


async function addUserWithValidation(user) {
    try {
      const newUser = new User(user);
      await newUser.save();
          console.log('User added successfully:', newUser);
   } catch (error) {
      console.error('Error adding user:', error.message);
    }
}


addUserWithValidation({ username: 'john_doe', email: 'john@123gmail.com' });
addUserWithValidation({ username: 'john_doe', email: 'invalid-email' });


app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});