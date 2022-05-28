const {query} = require("../libs/database");

class UserModel {
  static async getAll() {
    return await query("SELECT * FROM users");
  }
}

module.exports = UserModel;