const express = require("express");
const router = express.Router()
const UserController = require('../controllers/UserController');
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware');

router.get('/', authenticateToken, isAdmin, UserController.getAllUsers);
router.get('/:id', authenticateToken, isAdmin, UserController.getUserById);
router.put('/:id', authenticateToken, isAdmin, UserController.updateUser);
router.delete('/:id', authenticateToken, isAdmin, UserController.deleteUser);

module.exports = router