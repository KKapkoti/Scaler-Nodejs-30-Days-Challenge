const jwtUtils = require('../utils/jwtUtils');

function authenticationMiddleware(req, res, next) {
  // Get the JWT token from the request headers
  const token = req.headers.authorization;

  // Check if token is present
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    // Verify the token
    const decoded = jwtUtils.verifyToken(token);

    // Attach the decoded user object to the request for further use in the route handlers
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // Token verification failed
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
}

module.exports = authenticationMiddleware;

