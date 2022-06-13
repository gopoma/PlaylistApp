const PlaylistModel = require("../models/playlists");

class PlaylistController {
  static async getMyPlaylists(req, res) {
    const playlists = await PlaylistModel.getMyPlaylists(req.session.user.idUser);
    return res.render("pages/playlists", {playlists});
  }
}

module.exports = PlaylistController;