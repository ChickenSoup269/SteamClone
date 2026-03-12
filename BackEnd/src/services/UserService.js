const User = require('../models/UserModel');
const Auth = require('../models/Auth/sessionModel');

class UserService {
  static async getAllUsers(page, limit) {
    return await User.find()
      .select('-password')
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();
  }

  static async getUserById(userId) {
    const user = await User.findOne({ userId }).select('-password').lean();
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  static async updateUser(userId, updateData) {
    if (updateData.email) {
      const existingUser = await User.findOne({ email: updateData.email, userId: { $ne: userId } });
      if (existingUser) {
        throw new Error('Email already exists');
      }
    }

    if (updateData.username) {
      const existingUser = await User.findOne({ username: updateData.username, userId: { $ne: userId } });
      if (existingUser) {
        throw new Error('Username already exists');
      }
    }

    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const user = await User.findOneAndUpdate(
      { userId },
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  static async deleteUser(userId) {
    const user = await User.findOneAndDelete({ userId });
    if (!user) {
      throw new Error('User not found');
    }
    await Auth.deleteOne({ userId });
    return true;
  }
}

module.exports = UserService;