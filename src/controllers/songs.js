const SongModel = require("../models/songs");

class SongController {
  static async getAll(req, res) {
    const songs = await SongModel.getAll();
    return res.render("pages/songs", {songs});
  }

  static async getCreateView(req, res) {
    return res.render("pages/createSong");
  }
  static async create(req, res) {
    const newSong = new SongModel({
      ...req.body,
      publisher: req.session.user.idUser,
      public: "on"
    });

    const {success, errors} = newSong.validate();
    if(!success) {
      return res.render("pages/createSong", {
        displayMessages: true,
        error: true,
        messages: errors,
        songData: req.body
      });
    }

    const savedSong = await newSong.save();
    if(!savedSong.success) {
      return res.render("pages/createSong", {
        displayMessages: true,
        error: true,
        messages: [savedSong.message],
        songData: req.body
      });
    }

    return res.redirect("/songs");
  }
}

module.exports = SongController;