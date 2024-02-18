const express = require('express');
const morgan = require('morgan');

const app = express();

//Morgan middleware
app.use(morgan('dev'));

app.use(loggingMiddleware);

//Logging middleware
function loggingMiddleware(req, res, next) {
    console.log('Timestamp:', new Date());
    console.log('Method:', req.method);
    console.log('URL:', req.url);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    console.log('---------------------');
    next();
  };


app.get('/', (req, res) => {
  const data = { message: '#day15-challenge completed successfully' };
  res.send(data);
});
  
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});


