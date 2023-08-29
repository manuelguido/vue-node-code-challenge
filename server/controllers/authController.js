const bcrypt = require('bcrypt');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

async function login(req, res) {
  try {
    // Request data
    const { email, password } = req.body;

    // Find the user by email
    const user = await userModel.getUserByEmail(email);

    // Response in case of none existing user
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    // Response in case of wrong password
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Create a JWT token
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, jwtSecret, { expiresIn: '1h' }, (error, token) => {
      if (error) throw error;
      res.json({ message: user, token, user });
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function register(req, res) {
  try {
    // Request data
    const { name, email, password } = req.body;

    // Check if the email already exists
    const existingUser = await userModel.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 saltRounds

    // Create a new user
    const newUser = {
      name,
      email,
      password: hashedPassword,
    };

    // Create user model
    await userModel.createUser(newUser);

    // Create a JWT token
    const payload = {
      user: {
        id: newUser.id,
      },
    };

    jwt.sign(payload, jwtSecret, { expiresIn: '1h' }, (error, token) => {
      if (error) throw error;
      res.status(201).json({ message: 'User registered successfully', token });
    });

  }
  // Send back error in case of failure
  catch (error) {
    res.status(500).json({ message: error });
  }
}

module.exports = {
  login,
  register,
};
