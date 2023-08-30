const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config'); // Adjust the path as needed
const userModel = require('../models/user.model'); // Import your user model

// Authentication middleware function
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.get('Authorization');

    // Check if the token is missing
    if (!token) {
      return res.status(401).json({ message: req.get('Authorization') });
    }

    // Verify the JWT token
    const decoded = jwt.verify(token, jwtSecret);

    // Find the user based on the decoded user ID
    const user = await userModel.findById(decoded.user.id);

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ message: req.get('Authorization')  });
    }

    // Attach the user to the request for further route handling
    req.user = user;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: req.get('Authorization')  });
  }
};

module.exports = authMiddleware;
