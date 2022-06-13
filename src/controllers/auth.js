const bcrypt = require("bcrypt");
const UserModel = require("../models/users");

class AuthController {
  static getLoginView(req, res) {
    return res.render("pages/login");
  }
  static async logIn(req, res) {
    const {email, password} = req.body;
    const user = await UserModel.getByEmail(email);

    if(!email || !password) {
      return res.render("pages/login", {
        displayMessages: true,
        error: true,
        messages: ["Fill all the fields"]
      });
    }
    if(!user) {
      return res.render("pages/login", {
        displayMessages: true,
        error: true,
        messages: ["Unregistered user"]
      })
    }
    if(!(await bcrypt.compare(password, user.password))) {
      return res.render("pages/login", {
        displayMessages: true,
        error: true,
        messages: ["Incorrect credentials"]
      });
    }

    req.session.user = {
      loggedIn: true,
      idUser: user.id,
      username: user.username,
      fullname: user.fullname,
      email: user.email,
      role: user.role
    };
    
    return res.redirect("/");
  }

  static getSignUpView(req, res) {
    return res.render("pages/signup");
  }
  static async signUp(req, res) {
    // Flattened the sensitive data
    req.body.role = 1;
    req.body.active = "on";

    const newUser = new UserModel(req.body);
    const validation = newUser.validate();

    if(!validation.success) {
      return res.render("pages/signup", {
        displayMessages: true,
        error: true,
        messages: validation.errors,
        userData: req.body
      });
    }

    const savedUser = await newUser.save();
    
    if(!savedUser.success) {
      return res.render("pages/signup", {
        displayMessages: true,
        error: true,
        messages: [savedUser.message],
        userData: req.body
      });
    }

    req.session.user = {
      loggedIn: true,
      idUser: savedUser.user.id,
      username: savedUser.user.username,
      fullname: savedUser.user.fullname,
      email: savedUser.user.email,
      role: savedUser.user.role
    };

    return res.redirect("/");
  }

  static logOut(req, res) {
    req.session.destroy();
    return res.redirect("/");
  }
}

module.exports = AuthController;