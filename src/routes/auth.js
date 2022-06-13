const express = require("express");
const AuthController = require("../controllers/auth");
const verifySession = require("../middleware/verifySession");

function auth(app) {
  const router = express.Router();
  router.use(verifySession({
    authRequired: false,
    exclude: ["/logout"]
  }));
  app.use("/auth", router);


  router.get("/login", AuthController.getLoginView);
  router.post("/login", AuthController.logIn);
  router.get("/signup", AuthController.getSignUpView);
  router.post("/signup", AuthController.signUp);
  router.get("/logout", AuthController.logOut);
}

module.exports = auth;