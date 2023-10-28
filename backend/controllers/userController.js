import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/userModel.js';

// Description: Authenticate user and get token
// Route:       GET /api/users/login
// Access:      public

const authUser = asyncHandler(async (req, res) => {
  res.send('authenticate user');
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
