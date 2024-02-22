const express = require('express');
const app = express();

 function greetHandler(req, res){
    //Code Implementation
    const name = req.query.name || 'Guest';
        res.send(`Hello, ${name}!`);
  };
  

  // Define the route to handle GET requests to /greet
   app.get('/greet', greetHandler);


  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
  });
