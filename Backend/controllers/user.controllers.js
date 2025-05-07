const userModel = require('../models/user.model');
const userService = require('../services/user.services');
const { validationResult } = require('express-validator');

//handle User registration 
module.exports.registerUser = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(404).json({ errors: error.array() });
  }

  console.log(req.body);
  const { fullname, email, password } = req.body;

  if (!fullname || !fullname.firstname || !fullname.lastname) {
    return res.status(400).json({ message: 'Fullname fields are required' });
  }

  const { firstname, lastname } = fullname;
  const hashedPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({
    firstname,
    lastname,
    email,
    password: hashedPassword,
  });

  const token = await user.generateAuthToken();
  res.status(201).json({ token, user });
};

//handle User login
module.exports.loginUser = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(404).json({ errors: error.array() });
  }

  console.log(req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = await userModel.findOne({ email }).select('+password');

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = await user.generateAuthToken();
  res.status(200).json({ token, user });
};

//handle User profile
module.exports.userProfile = async (req, res) => {
  // Dummy response for now
  res.status(200).json({ message: "User profile accessed successfully" });
};
