const bcrypt = require("bcrypt");
const {
  query, 
  insert
} = require("../libs/database");

class UserModel {
  constructor(user) {
    this.fullname = user.fullname;
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
    this.passwordRepeated = user.passwordRepeated;
    this.role = Number.parseInt(user.role);
    this.profilePicture = user.profilePicture;
    // TODO: Fix this Dangerous built
    this.birthday = (user.birthday)?user.birthday:new Date().toLocaleString().split(" ")[0].split("/").reduceRight((a, x) => `${a}/${x}`);
    this.active = (user.active==="on")?1:0;
  }

  validate() {
    const validation = {success:true, errors:[]};

    if(!this.fullname || !this.username || !this.email || !this.password) {
      validation.success = false;
      validation.errors.push("Fill all the fields");
    }
    if(!this.email.match(/^[a-zA-Z0-9]+(.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(.[a-zA-Z0-9]+)+$/)) {
      validation.success = false;
      validation.errors.push("Invalid Email");
    }
    if(this.username.length < 3) {
      validation.success = false;
      validation.errors.push("Username less than 3 characters");
    }
    if(!this.#contains([1, 10], this.role)) {
      validation.success = false;
      validation.errors.push("Invalid role");
    }
    if(this.password !== this.passwordRepeated) {
      validation.success = false;
      validation.errors.push("Passwords don't match");
    }

    return validation;
  }

  async save() {
    const user = {
      fullname: this.fullname,
      username: this.username,
      email: this.email,
      password: await this.#encrypt(this.password),
      role: this.role,
      profilePicture: this.profilePicture,
      birthday: this.birthday,
      active: this.active
    };

    const result = await insert("users", user);
    return {...result, user};
  }

  #contains(arr, queryItem) {
    return arr.filter(item => item === queryItem).length > 0;
  }

  async #encrypt(str) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(str, salt);

    return hash;
  }

  static async getAll() {
    return await query("SELECT * FROM users");
  }
  static async getByEmail(email) {
    const [user] = await query("SELECT * FROM users WHERE email=?", [email])
    return user;
  }
}

module.exports = UserModel;