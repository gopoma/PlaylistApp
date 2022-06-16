const SongModel = require("../models/songs");

class SongController {
  static async getAll(req, res) {
    const {result:songs} = await SongModel.getAll();
    const status = req.flash("status");
    const [success, message] = status;

    return res.render("pages/songs", {
      songs, 
      displayMessages: status.length,
      error: !success,
      messages: [message]
    });
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

    req.flash("status", [true, "Song created successfully"]);
    return res.redirect("/songs");
  }

  static async getFilteredSongs(req, res) {
    const { genre, title } = req.query;
    let songs;
    if(!genre && !title) {
      return this.getAll(req, res);
    } else if(genre && !title) {
      songs = (await SongModel.filterByGenre(genre)).result;
    } else if(!genre && title) {
      songs = (await SongModel.filterByTitle(title)).result;
    } else {
      songs = (await SongModel.filterByGenreAndTitle(genre, title)).result;
    }
    const status = req.flash("status");
    const [success, message] = status;

    return res.render("pages/songs", {
      songs, 
      displayMessages: status.length,
      error: !success,
      messages: [message]
    });
  }
}

module.exports = SongController;