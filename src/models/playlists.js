const {
  query, 
  insert
} = require("../libs/database");

class PlaylistModel {
  constructor(playlist) {
    this.owner = playlist.owner;
    this.name = playlist.name;
    this.public = (playlist.public==="on")?1:0;
  }

  validate() {
    const validation = {success:true, errors:[]};

    if(!this.owner || !this.name || !this.public) {
      validation.success = false;
      validation.errors.push("Fill all the fields");
    }

    return validation;
  }

  async save() {
    const playlistData = {
      owner: this.owner,
      name: this.name,
      public: this.public
    };

    return await insert("playlists", playlistData);
  }

  static async getMyPlaylists(idUser) {
    const playlistsData = await query("SELECT * FROM playlists WHERE owner=?", [idUser]);
    const playlists = playlistsData.result;
    return playlists;    
  }

  static async addSong(idPlaylist, idSong) {
    const songData = await query("SELECT * FROM playlists_songs WHERE id_playlist=? AND id_song=?", [idPlaylist, idSong]);
    const [song] = songData.result;

    if(song) {
      return {
        success: false,
        message: "Song already in Playlist"
      };
    }
    return await query("INSERT INTO playlists_songs(id_playlist, id_song) VALUES(?, ?)", [idPlaylist, idSong]);
  }
}

module.exports = PlaylistModel;