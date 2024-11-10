const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Your User model
const jwt = require('jsonwebtoken'); // For generating a token

exports.registerUser = async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Respond with success and user data (excluding the password)
    res.status(201).json({
      message: 'User created successfully',
      user: { id: user._id, email: user.email },
      token, // Send the JWT token as well
    });
  } catch (error) {
    console.error('Error during registration:', error); // Log the error in server
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Respond with success and the token
    res.status(200).json({
      message: 'Login successful',
      token, // Send the JWT token
    });
  } catch (error) {
    console.error('Error during login:', error); // Log the error in server
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};
