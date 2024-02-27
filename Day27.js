const express = require('express');
const authenticateAndAuthorize = require('./authenticateAndAuthorize');
const jwt = require('jsonwebtoken');
const { UnauthorizedError, ForbiddenError } = require('http-errors');

const app = express();

// admin routes  Middleware 
const adminMiddleware = authenticateAndAuthorize(['admin']);

// regular user routes  Middleware
const userMiddleware = authenticateAndAuthorize(['user']);


function authenticateAndAuthorize(roles) {
    return async (req, res, next) => {
      try {
        const token = req.headers.authorization;
        if (!token) {
          throw new UnauthorizedError('Authentication token is missing.');
        }
  
        // token verification
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
          throw new UnauthorizedError('Invalid authentication token.');
        }
  
        // Check if the user has the required role
        if (roles && roles.length && !roles.includes(decoded.role)) {
          throw new ForbiddenError('You are not authorized to access this resource.');
        }
      req.user = decoded;

      // Call the next middleware or route handler
      next();
    } catch (error) {
      next(error);
    }
  };
}

app.get('/admin', adminMiddleware, (req, res) => {
    console.log({ message: 'Hy admin' });
    res.status(200).send({ message: 'Admin route accessed' });
});

app.get('/user', userMiddleware, (req, res) => {
  console.log({message: 'Hello user!'});
  res.status(200).send({ message: 'Admin route accessed' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
