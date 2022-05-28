const UserModel = require("../models/users");

class AdminController {
  async getAllUsers(req, res) {
    const users = await UserModel.getAll();
    return res.json(users);
  }

  getCreateUserView(req, res) {
    return res.render("createUser", {title:"CREATE user"});
  }

  async createUser(req, res) {
    const newUser = new UserModel(req.body);
    const validation = newUser.validate();

    if(!validation.success) {
      return res.json(validation);
    }
    const savedUser = await newUser.save();
    if(!savedUser.inserted) {
      return res.json({success:false});
    }

    return res.json(savedUser);
  }
}

module.exports = AdminController;