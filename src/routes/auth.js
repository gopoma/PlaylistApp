const express = require("express");
const AuthController = require("../controllers/auth");

function auth(app) {
  const router = express.Router();
  app.use("/auth", router);

  router.get("/login", AuthController.getLoginView);
  router.post("/login", AuthController.logIn);
  router.get("/signup", AuthController.getSignUpView);
  router.post("/signup", AuthController.signUp);
}

module.exports = auth;