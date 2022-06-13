const express = require("express");
const verifySession = require("../middleware/verifySession");
const PlaylistController = require("../controllers/playlists");

function playlists(app) {
  const router = express.Router();
  router.use(verifySession({authRequired:true}));
  app.use("/playlists", router);

  router.get("/", PlaylistController.getMyPlaylists);
}

module.exports = playlists;