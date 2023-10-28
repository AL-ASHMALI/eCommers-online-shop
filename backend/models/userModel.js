import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: {
      type: 'string',
      required: true,
    },
    email: {
      type: 'string',
      required: true,
      unique: true,
    },
    password: {
      type: 'string',
      required: true,
    },
    isAdmin: {
      type: 'boolean',
      required: true,
      default: false,
    },
  },
  { Timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
