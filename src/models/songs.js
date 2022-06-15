const {query, insert} = require("../libs/database");

class SongModel {
  constructor(song) {
    this.publisher = song.publisher;
    this.title = song.title;
    this.description = song.description;
    this.thumbnail = song.thumbnail;
    this.public = (song.public==="on")?1:0;
    this.path = song.path;
  }

  validate() {
    const validation = {success:true, errors:[]};

    if(!this.publisher || !this.title || !this.public || !this.path) {
      validation.success = false;
      validation.errors.push("Fill all the fields");
    }

    return validation;
  }

  async save() {
    const songData = {
      publisher: this.publisher,
      title: this.title,
      description: this.description,
      thumbnail: this.thumbnail,
      public: this.public,
      path: this.path
    };

    return await insert("songs", songData);
  }

  static async getAll() {
    const songsData = await query("SELECT * FROM songs ORDER by id DESC");
    const songs = songsData.result;
    return songs;
  }
}

module.exports = SongModel;