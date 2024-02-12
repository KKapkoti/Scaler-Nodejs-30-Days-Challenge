// middleware/rateLimitMiddleware.js

const { RateLimiterMemory } = require('rate-limiter-flexible');

// Set up rate limiter
const rateLimiter = new RateLimiterMemory({
  points: 5, // Number of points
  duration: 1, // Per second
});

// Rate limiting middleware
function rateLimitMiddleware(req, res, next) {
  const ip = req.ip; // Get IP address

  rateLimiter.consume(ip) // Consume a point for this IP
    .then(() => {
      next(); // If within limit, proceed to the next middleware
    })
    .catch(() => {
      res.status(429).send('Too Many Requests'); // If limit exceeded, send 429 status
    });
}

module.exports = rateLimitMiddleware;
