const {
  query, 
  insert
} = require("../libs/database");

class PlaylistModel {
  static async getMyPlaylists(idUser) {
    const playlistsData = await query("SELECT * FROM playlists WHERE owner=?", [idUser]);
    const playlists = playlistsData.result;
    return playlists;    
  }
}

module.exports = PlaylistModel;