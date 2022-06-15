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

  static async getRelatedPlaylists(req, res) {
    const {success, result:playlists} = await PlaylistModel.getRelatedPlaylists(req.params.idSong, req.session.user.idUser);
    return res.status(success?200:400).json(playlists);
  }

  static async addSongToPlaylist(req, res) {
    const {idPlaylist, idSong} = req.query;
    const {success, message:failureMessage} = await PlaylistModel.addSong(idPlaylist, idSong);
    const messages = success?[true, "Song added to Playlist successfully"]:[false, failureMessage];
    req.flash("status", messages);
    return res.redirect("/songs");
  }

  static async removeSongToPlaylist(req, res) {
    const {idPlaylist, idSong, deletedFromPlaylist, redirectURL} = req.query;
    const {success, message:failureMessage} = await PlaylistModel.removeSong(idPlaylist, idSong);
    const messages = success?[true, "Song removed to Playlist successfully"]:[false, failureMessage];
    req.flash("status", messages);

    if(deletedFromPlaylist) {
      return res.redirect(redirectURL);
    }
    return res.redirect("/songs");
  }

  static async getSongsFromPlaylist(req, res) {
    const { idPlaylist } = req.params;
    const {result:playlists} = await PlaylistModel.getById(idPlaylist);
    const [playlist] = playlists;
    const {result:songs} = await PlaylistModel.getSongsFromPlaylists(idPlaylist);
    return res.render("pages/songs", {
      displayDeleteMessage: true,
      idPlaylist: idPlaylist,
      playlist,
      songs,
    });
  }
}

module.exports = PlaylistController;