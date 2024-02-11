const express = require('express');
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const app = express();
app.use(express.json());

// Custom middleware - Authentication Middleware
const authenticationMiddleware = require('./middlewares/authenticationMiddleware');
app.use(authenticationMiddleware);

//route
app.get('/protected', (req, res) => {
  res.json({ message: 'Access granted to protected route', user: req.user });
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Helper function to generate or read the JWT secret key
function generateOrReadSecretKey() {
  const envFilePath = path.resolve(__dirname, '.env');

  if (fs.existsSync(envFilePath)) {
    const existingEnvContent = fs.readFileSync(envFilePath, 'utf8');
    const match = existingEnvContent.match(/JWT_SECRET=(.*)/);

    if (match && match[1]) {
      return match[1];
    }
  }

  // Generate a random secret key
  const newSecretKey = crypto.randomBytes(32).toString('hex');

  // Append the new secret key to the .env file
  fs.appendFileSync(envFilePath, `\nJWT_SECRET=${newSecretKey}`);

  return newSecretKey;
}

// Generate or read the secret key
const secretKey = generateOrReadSecretKey();
console.log('Using Secret Key:', secretKey);
