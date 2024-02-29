const express = require('express')
const app= express();
const PORT= 7000;

//middleware 
app.use(express.json());

app.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    next();
})

// Route  to handle error
app.get('/error', (req, res) => {
    const undefinedValue = undefined;
    const value = undefinedValue.property;
    res.send(value);
});
  
// Custom error handling middleware
function errorHandler(err, req, res, next) {
    if (res.headersSent) {
      return next(err);
    }
    res.status(500).send({ error: 'There is an some issues!' });
}
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});