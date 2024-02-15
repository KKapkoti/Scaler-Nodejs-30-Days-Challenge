const cache = require('memory-cache');

// Middleware function
function cachingMiddleware(req, res, next) {
  const key = req.originalUrl || req.url;
  const cachedResponse = cache.get(key);

  // If there's a cached response, send it back
  if (cachedResponse) {
    res.send(cachedResponse);
    return;
  }

  // If not, store the response in the cache and continue to the next middleware
  const originalSend = res.send;
  res.send = function (body) {
    cache.put(key, body);
    originalSend.call(this, body);
  };

  next();
}

module.exports = cachingMiddleware;
