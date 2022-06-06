const bcrypt = require("bcrypt");
const UserModel = require("../models/users");

class AuthController {
  static getLoginView(req, res) {
    console.log(req.session);
    return res.render("login");
  }

  static async logIn(req, res) {
    const {email, password} = req.body;
    const user = await UserModel.getByEmail(email);

    if(!email || !password) {
      return res.render("login", {
        authError: true,
        authErrors: ["Fill all the fields"]
      });
    }
    if(!user) {
      return res.render("login", {
        authError: true,
        authErrors: ["Usuario no registrado"]
      })
    }
    if(!(await bcrypt.compare(password, user.password))) {
      return res.render("login", {
        authError: true,
        authErrors: ["Credenciales incorrectas"]
      });
    }

    req.session.loggedIn = true;
    req.session.idUser = user.id;
    return res.json("Logged In");
  }

  static getSignUpView(req, res) {
    return res.render("signup");
  }

  static async signUp(req, res) {
    // Flattened the sensitive data
    req.body.role = 1;
    req.body.active = "on";
    console.log(req.body);

    const newUser = new UserModel(req.body);
    const validation = newUser.validate();

    if(!validation.success) {
      return res.render("signup", {
        authError: true,
        authErrors: validation.errors,
        user: req.body
      });
    }

    const savedUser = await newUser.save();
    return res.json(savedUser);
  }
}

module.exports = AuthController;