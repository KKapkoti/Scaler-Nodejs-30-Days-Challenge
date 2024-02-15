const express = require('express');
const cachingMiddleware = require('./middleware/caching');

const app = express();

//caching middleware
app.use(cachingMiddleware);

//api/data routes
app.get('/api/data', (req, res) => {
  //logic to fetch data...
  const data = { message: '#day14-completed' };
  res.send(data);
});


//server
app.listen(3000, () => {
  console.log('Server is running on https://localhost:3000');
});


