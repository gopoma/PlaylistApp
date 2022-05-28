const express = require("express");

function auth(app) {
  const router = express.Router();
  app.use("/auth", router);
}

module.exports = auth;