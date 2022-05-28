const UserModel = require("../models/users");

class AdminController {
  async getAllUsers(req, res) {
    const users = await UserModel.getAll();
    return res.json(users);
  }

  getCreateUserView(req, res) {
    return res.render("createUser");
  }
}

module.exports = AdminController;