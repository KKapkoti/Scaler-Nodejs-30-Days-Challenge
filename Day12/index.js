const express = require('express');
const rateLimitMiddleware = require('./middleware/rateLimitMiddleware');

const app = express();

//middleware
app.use(rateLimitMiddleware);


//routes
app.get('/', (req, res) => {
  res.send('#Day12-of-30-days-of-Node.js-challenge');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
