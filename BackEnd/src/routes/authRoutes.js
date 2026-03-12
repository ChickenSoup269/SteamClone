const express = require('express');
const AuthController = require('../controllers/authController');
const { authenticateToken} = require('../middleware/authMiddleware');
const router = express.Router();
// Auth routes
router.post('/register', AuthController.registerValidation, AuthController.register);
router.post('/login', AuthController.loginValidation, AuthController.login);
router.post('/refresh-token', AuthController.refreshToken);
router.post('/logout', authenticateToken, AuthController.logout);
module.exports = router;