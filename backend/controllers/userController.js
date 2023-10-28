import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/userModel.js';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

// Description: Authenticate user and get token
// Route:       GET /api/users/login
// Access:      public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '20d', // 20 days
    });

    // Set JWT a HTTP-ONLY cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 20 * 24 * 60 * 60 * 1000, // 20 days
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error('Invalid Email or Password');
  }
});

// Description: Register new user
// Route:       POST /api/users
// Access:      public
const registerUser = asyncHandler(async (req, res) => {
  res.send('register user');
});

// Description: Logout user
// Route:       POST /api/users/logout
// Access:      Private
const logoutUser = asyncHandler(async (req, res) => {
  res.send('logout user');
});

// Description: Get user profile
// Route:       GET /api/users/profile
// Access:      Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send('get user profile');
});

// Description: update user profile
// Route:       PUT /api/users/profile
// Access:      Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send('update user profile');
});

// Description: Get users
// Route:       GET /api/users
// Access:      Private/admin

const getUsers = asyncHandler(async (req, res) => {
  res.send('get users');
});

// Description: Get user by ID
// Route:       GET /api/users/:id
// Access:      Private/admin

const getUserById = asyncHandler(async (req, res) => {
  res.send('get user by id');
});

// Description: Delete user
// Route:       DELETE /api/users/:id
// Access:      Private/admin

const deleteUser = asyncHandler(async (req, res) => {
  res.send('delete user');
});

// Description: Update user
// Route:       PUT /api/users/:id
// Access:      Private/admin

const updateUser = asyncHandler(async (req, res) => {
  res.send('update users');
});

export {
  authUser,
  registerUser,
  logoutUser,
  updateUserProfile,
  getUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
