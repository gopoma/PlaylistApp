const PlaylistModel = require("../models/playlists");

class PlaylistController {
  static async getMyPlaylists(req, res) {
    const playlists = await PlaylistModel.getMyPlaylists(req.session.user.idUser);
    return res.render("pages/playlists", {playlists});
  }

  static getCreateView(req, res) {
    return res.render("pages/createPlaylist");
  }
  static async create(req, res) {
    const newPlaylist = new PlaylistModel({
      ...req.body,
      owner: req.session.user.idUser,
      public: "on"
    });

    const {success, errors} = newPlaylist.validate();
    if(!success) {
      return res.render("pages/createPlaylist", {
        displayMessages: true,
        error: true,
        messages: errors,
        playlistData: req.body
      });
    }

    const savedPlaylist = await newPlaylist.save();
    if(!savedPlaylist.success) {
      return res.render("pages/createPlaylist", {
        displayMessages: true,
        error: true,
        messages: [savedPlaylist.message],
        playlistData: req.body
      });
    }

    return res.redirect("/playlists");
  }
}

module.exports = PlaylistController;