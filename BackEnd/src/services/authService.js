const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const Auth = require('../models/Auth/sessionModel');
const { v4: uuidv4 } = require('uuid');

class AuthService {
  static async register(userData) {
    const { email, username, password } = userData;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      throw new Error('Email or username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      userId: uuidv4(),
      email,
      username,
      password: hashedPassword,
      role: 'user',
    });

    await user.save();

    const accessToken = jwt.sign(
      { userId: user.userId, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );
    const refreshToken = jwt.sign(
      { userId: user.userId },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    await Auth.create({
      userId: user.userId,
      refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return {
      action: 'register',
      message: 'User registered successfully',
      accessToken,
      refreshToken,
      user: { userId: user.userId, email, username, role: user.role }
    };
  }

  static async login({ email, password }) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    const accessToken = jwt.sign(
      { userId: user.userId, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );
    const refreshToken = jwt.sign(
      { userId: user.userId },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    await Auth.findOneAndUpdate(
      { userId: user.userId },
      {
        refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
      { upsert: true }
    );

    return {
      action: 'login',
      message: 'User logged in successfully',
      accessToken,
      refreshToken,
      user: { userId: user.userId, email, username: user.username, role: user.role }
    };
  }

  static async refreshToken(oldRefreshToken) {
    const auth = await Auth.findOne({ refreshToken: oldRefreshToken });
    if (!auth || auth.expiresAt < new Date()) {
      throw new Error('Invalid or expired refresh token');
    }

    let payload;
    try {
      payload = jwt.verify(oldRefreshToken, process.env.JWT_REFRESH_SECRET);
    } catch (err) {
      throw new Error('Invalid refresh token');
    }

    const user = await User.findOne({ userId: payload.userId });
    if (!user) {
      throw new Error('User not found');
    }

    const accessToken = jwt.sign(
      { userId: user.userId, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );
    const refreshToken = jwt.sign(
      { userId: user.userId },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    await Auth.findOneAndUpdate(
      { userId: user.userId },
      {
        refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      }
    );

    return { accessToken, refreshToken };
  }

  static async logout(userId) {
    await Auth.deleteOne({ userId });
  }

  static async forgotPassword(email) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Email not found');
    }

    const token = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = new Date(Date.now() + 900 * 60); // 1 giờ
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetUrl = `http://localhost:3001/auth/reset-password?token=${token}&email=${email}`;
    const mailOptions = {
      to: email,
      from: process.env.EMAIL_USER,
      subject: 'Password Reset Request',
      html: `
        <p>You requested a password reset.</p>
        <p>Click this <a href="${resetUrl}">link</a> to reset your password.</p>
        <p>This link will expire in 1 hour.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return { message: 'Password reset email sent' };
  }
  static async resetPassword({ email, token, newPassword }) {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
      email,
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
      throw new Error('Invalid or expired reset token');
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return { message: 'Password reset successfully' };
  }
}

module.exports = AuthService;