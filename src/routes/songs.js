const express = require("express");
const verifySession = require("../middleware/verifySession");
const validateRole = require("../middleware/validateRole");
const SongController = require("../controllers/songs");

function songs(app) {
  const router = express.Router();
  router.use(verifySession({authRequired:true}));
  app.use("/songs", router);

  router.get("/", SongController.getAll);
  router.get("/search", SongController.getFilteredSongs.bind(SongController));
  router.get("/create-song", validateRole(5), SongController.getCreateView);
  router.post("/create-song", validateRole(5), SongController.create);
}

module.exports = songs;