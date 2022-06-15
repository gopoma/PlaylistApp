const express = require("express");
const verifySession = require("../middleware/verifySession");
const PlaylistController = require("../controllers/playlists");

function playlists(app) {
  const router = express.Router();
  router.use(verifySession({authRequired:true}));
  app.use("/playlists", router);

  router.get("/", PlaylistController.getMyPlaylists);
  router.get("/create-playlist", PlaylistController.getCreateView);
  router.post("/create-playlist", PlaylistController.create);
  router.get("/relatedPlaylists/:idSong", PlaylistController.getRelatedPlaylists);
  router.get("/addSong", PlaylistController.addSongToPlaylist);
  router.get("/removeSong", PlaylistController.removeSongToPlaylist);
}

module.exports = playlists;