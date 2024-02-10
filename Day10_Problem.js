const express = require('express');
const path = require('path');

const app = express();
  
 
app.use(express.static(path.join(__dirname, 'public')));

 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,  'index.html'));
});



  // Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



