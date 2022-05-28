const express = require("express");
const AdminController = require("../controllers/admin");

function admin(app) {
  const router = express.Router();
  const adminController = new AdminController();
  app.use("/admin", router);

  router.get("/users", adminController.getAllUsers);
  router.get("/create-user", adminController.getCreateUserView);
}

module.exports = admin;