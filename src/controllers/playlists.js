const PlaylistModel = require("../models/playlists");

class PlaylistController {
  static async getMyPlaylists(req, res) {
    const status = req.flash("status");
    const [success, message] = status;
    const playlists = await PlaylistModel.getMyPlaylists(req.session.user.idUser);
    return res.render("pages/playlists", {
      playlists,
      displayMessages: status.length > 0,
      error: !success,
      messages: [message]
    });
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

    req.flash("status", [true, "Playlist created successfully"]);
    return res.redirect("/playlists");
  }

  static async addSongToPlaylist(req, res) {
    const {idPlaylist, idSong} = req.query;
    const {success, message:failureMessage} = await PlaylistModel.addSong(idPlaylist, idSong);
    const messages = success?[true, "Song added to Playlist successfully"]:[false, failureMessage];
    req.flash("status", messages);
    return res.redirect("/songs");
  }
}

module.exports = PlaylistController;