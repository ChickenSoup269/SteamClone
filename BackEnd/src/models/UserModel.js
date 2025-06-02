const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  email: { type: String, required: [true, 'Email is required'], unique: true, lowercase: true, trim: true },
  username: { type: String, required: [true, 'Username is required'], unique: true, trim: true },
  password: { type: String, required: [true, 'Password is required'] },
  avatar: { type: String, default: 'https://cdn.kona-blue.com/upload/kona-blue_com/post/images/2024/08/13/356/avatar-vo-tri-meo-3.jpg' },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now },
});

userSchema.index({ email: 1 });
userSchema.index({ username: 1 });

module.exports = mongoose.model('User', userSchema);