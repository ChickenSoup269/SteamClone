const UserService = require('../services/UserService');

class UserController {
  static async getAllUsers(req, res) {
    try {
      const { page = 1, limit = 20 } = req.query;
      const users = await UserService.getAllUsers(parseInt(page), parseInt(limit));
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await UserService.getUserById(id);
      res.status(200).json(user);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const user = await UserService.updateUser(id, req.body);
      res.status(200).json(user);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      await UserService.deleteUser(id);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
}

module.exports = UserController;