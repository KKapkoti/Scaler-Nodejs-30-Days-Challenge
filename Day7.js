/**
 * Express middleware to log incoming requests
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */

const express = require('express');
  const app = express();

function requestLoggerMiddleware(req, res, next) {
    const timestamp = new Date().toISOString();
    const method = req.method;
    console.log(`${timestamp} - ${method} request received.`);
    next(); // Call next to pass control to the next middleware in the chain
  }
  
  app.use(requestLoggerMiddleware); // Apply the middleware to all routes
  
  // Define your routes below
   app.get('/', (req,res) => {
       res.send('Welcome to-30-days-of-node-js-challenge');
   });
  
  // Start the server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  
