const {query, insert} = require("../libs/database");

class SongModel {
  constructor(song) {
    this.publisher = song.publisher;
    this.title = song.title;
    this.description = song.description;
    this.thumbnail = song.thumbnail;
    this.public = (song.public==="on")?1:0;
    this.path = song.path;
    this.genre = song.genre;
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
      path: this.path,
      genre: this.genre
    };

    return await insert("songs", songData);
  }

  static async getAll() {
    return await query(`
      SELECT songs.id, songs.publisher, songs.title, songs.description, songs.thumbnail, songs.public, songs.path, songs.genre,
      users.id AS publisher_id, users.username AS publisher_username
      FROM songs 
      JOIN users 
      ON songs.publisher=users.id 
      ORDER BY songs.id DESC;
    `);
  }

  static async filterByGenre(genre) {
    return await query(`
      SELECT songs.id, songs.publisher, songs.title, songs.description, songs.thumbnail, songs.public, songs.path, songs.genre,
      users.id AS publisher_id, users.username AS publisher_username
      FROM songs 
      JOIN users
      ON songs.publisher=users.id
      WHERE songs.genre=?
      ORDER BY songs.id DESC;
    `, [genre]);
  }

  static async filterByTitle(title) {
    return await query(`
      SELECT songs.id, songs.publisher, songs.title, songs.description, songs.thumbnail, songs.public, songs.path, songs.genre,
      users.id AS publisher_id, users.username AS publisher_username
      FROM songs 
      JOIN users
      ON songs.publisher=users.id
      WHERE songs.title LIKE ?
      ORDER BY songs.id DESC;
    `, [`%${title}%`]);
  }

  static async filterByGenreAndTitle(genre, title) {
    return await query(`
      SELECT songs.id, songs.publisher, songs.title, songs.description, songs.thumbnail, songs.public, songs.path, songs.genre,
      users.id AS publisher_id, users.username AS publisher_username
      FROM songs 
      JOIN users
      ON songs.publisher=users.id
      WHERE songs.genre=? AND songs.title LIKE ?
      ORDER BY songs.id DESC;
    `, [genre, `%${title}%`]);
  }
}

module.exports = SongModel;