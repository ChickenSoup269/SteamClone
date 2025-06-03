const { body, validationResult } = require('express-validator');
const AuthService = require('../services/authService');

class AuthController {
  static registerValidation = [
    body('email').isEmail().withMessage('Invalid email format'),
    body('username').notEmpty().trim().withMessage('Username is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ];

  static async register(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const result = await AuthService.register(req.body);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static loginValidation = [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),
  ];

  static async login(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const result = await AuthService.login(req.body);
      res.status(200).json(result);
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  }

  static async refreshToken(req, res) {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token is required' });
    }

    try {
      const result = await AuthService.refreshToken(refreshToken);
      res.status(200).json(result);
    } catch (err) {
      res.status(403).json({ message: err.message });
    }
  }

  static async logout(req, res) {
    try {
      await AuthService.logout(req.user.userId);
      res.status(200).json({ message: 'Logged out successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static forgotPasswordValidation = [
    body('email').isEmail().withMessage('Invalid email format'),
  ];

  static async forgotPassword(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const result = await AuthService.forgotPassword(req.body.email);
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static resetPasswordValidation = [
    body('email').isEmail().withMessage('Invalid email format'),
    body('token').notEmpty().withMessage('Token is required'),
    body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters'),
  ];

  static async resetPassword(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const result = await AuthService.resetPassword(req.body);
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = AuthController;