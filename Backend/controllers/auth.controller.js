import asyncHandler from '../utils/async-handler.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../utils/token.js';
import crypto from 'crypto';

// Create user in this section
const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;

  if (!fullname || !email || !password) {
    res.status(400);
    throw new Error('Please provide all fields');
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    data: {
      fullname,
      email,
      password: hashedPassword,
    }
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      token: generateAccessToken(user),
      refreshToken: generateRefreshToken(user),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});


const loginUser = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;

  if (!fullname || !email || !password) {
    res.status(400);
    throw new Error('Please provide all fields');
  }

  const userLogin = await db.user.findUnique({
    where: { email },
  });
  if (!userLogin) {
    res.status(400);
    throw new Error('User not found');
  }

  if (userLogin.fullname !== fullname) {
    res.status(400);
    throw new Error('Invalid fullname');
  }

  const isMatch = await bcrypt.compare(password, userLogin.password);
  if (!isMatch) {
    res.status(400);
    throw new Error('Invalid password');
  }

  res.status(200).json({
    _id: userLogin._id,
    fullname: userLogin.fullname,
    email: userLogin.email,
    token: generateAccessToken(userLogin),
  });
});

const verifyEmail = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;

  if (!fullname || !email || !password) {
    res.status(400);
    throw new Error('Please provide all fields');
  }

  const userEmailVerify = await User.findOne({ email });
  if (userEmailVerify) {
    res.status(400);
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    fullname,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      token: generateAccessToken(user),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

const resendVerificationEmail = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;

  if (!fullname || !email || !password) {
    res.status(400);
    throw new Error('Please provide all fields');
  }

  const userResendEmail = await User.findOne({ email });
  if (!userResendEmail) {
    res.status(400);
    throw new Error('User not found');
  }

  if (userResendEmail.fullname !== fullname) {
    res.status(400);
    throw new Error('Invalid fullname');
  }

  const isMatch = await bcrypt.compare(password, userResendEmail.password);
  if (!isMatch) {
    res.status(400);
    throw new Error('Invalid password');
  }

  res.status(200).json({
    _id: userResendEmail._id,
    fullname: userResendEmail.fullname,
    email: userResendEmail.email,
    token: generateAccessToken(userResendEmail),
  });
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;

  if (!fullname || !email || !password) {
    res.status(400);
    throw new Error('Please provide all fields');
  }

  const userRefreshToken = await User.findOne({ email });
  if (!userRefreshToken || userRefreshToken.fullname !== fullname) {
    res.status(400);
    throw new Error('User not found or invalid fullname');
  }

  const isMatch = await bcrypt.compare(password, userRefreshToken.password);
  if (!isMatch) {
    res.status(400);
    throw new Error('Invalid password');
  }

  res.status(200).json({
    _id: userRefreshToken._id,
    fullname: userRefreshToken.fullname,
    email: userRefreshToken.email,
    token: generateAccessToken(userRefreshToken),
  });
});

const forgotPasswordRequest = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error('Please provide your email');
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const resetToken = crypto.randomBytes(20).toString('hex');

  user.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  await user.save();

  const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/resetpassword/${resetToken}`;

  res.status(200).json({
    success: true,
    message: 'Password reset link sent to email',
    resetUrl,
  });
});

const changeCurrentUser = asyncHandler(async (req, res) => {
  const { email, currentPassword, newFullname, newPassword } = req.body;

  if (!email || !currentPassword) {
    res.status(400);
    throw new Error('Email and current password are required');
  }

  const userChange = await User.findOne({ email });
  if (!userChange) {
    res.status(400);
    throw new Error('User not found');
  }

  const isMatch = await bcrypt.compare(currentPassword, userChange.password);
  if (!isMatch) {
    res.status(401);
    throw new Error('Invalid current password');
  }

  if (newFullname) {
    userChange.fullname = newFullname;
  }

  if (newPassword) {
    const salt = await bcrypt.genSalt(10);
    userChange.password = await bcrypt.hash(newPassword, salt);
  }

  await userChange.save();

  res.status(200).json({
    _id: userChange._id,
    fullname: userChange.fullname,
    email: userChange.email,
    token: generateAccessToken(userChange),
    message: 'User updated successfully',
  });
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.status(200).json({
    _id: user._id,
    fullname: user.fullname,
    email: user.email,
    createdAt: user.createdAt,
  });
});

export {
  registerUser,
  loginUser,
  verifyEmail,
  resendVerificationEmail,
  refreshAccessToken,
  forgotPasswordRequest,
  changeCurrentUser,
  getCurrentUser,
};