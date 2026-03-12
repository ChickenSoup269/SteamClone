const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
  userId: { type: String, required: true, ref: 'User' },
  refreshToken: { type: String },
  expiresAt: { type: Date },
  resetToken: { type: String },
  resetTokenExpires: { type: Date },
});

authSchema.index({ userId: 1 });
authSchema.index({ refreshToken: 1 });
authSchema.index({ resetToken: 1 });

module.exports = mongoose.model('Auth', authSchema);