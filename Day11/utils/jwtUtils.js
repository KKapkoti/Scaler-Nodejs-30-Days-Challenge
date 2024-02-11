// utils/jwtUtils.js

const jwt = require('jsonwebtoken');

function generateToken(payload) {
  // Generate a JWT token with the payload
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); // Replace process.env.JWT_SECRET with your actual JWT secret

  return token;
}

function verifyToken(token) {
  // Your token verification logic here
  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace process.env.JWT_SECRET with your actual JWT secret

    // If verification succeeds, return the decoded token
    return decoded;
  } catch (err) {
    // If verification fails, throw an error
    throw new Error('Invalid token');
  }
}

module.exports = {
  generateToken,
  verifyToken
};
