const express = require('express')
const app = express()

function errorHandler(err, req, res, next) {
  if (err instanceof PositiveIntegerError) {
    res.status(400).json({ error: err.message });
  } else {
    next(err);
  }
}


class PositiveIntegerError extends Error {
  constructor(message) {
    super(message);
    this.name = 'PositiveIntegerError';
  }
}

// Express route with positive integer validation
app.get('/positive', (req, res, next) => {
  const number = parseInt(req.query.number);
  if (Number.isInteger(number) && number > 0) {
    res.json({ message: 'Success' });
  } else {
    next(new PositiveIntegerError('Number must be a positive integer.'));
  }
});


app.use(errorHandler);

const port = process.env.PORT  || 4000

app.listen(4000, () => 
console.log(`port is running on ${port}`));