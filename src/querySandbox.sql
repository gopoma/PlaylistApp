CREATE DATABASE PlaylistApp;
USE PlaylistApp;

SELECT * FROM users;

SELECT * FROM songs;
INSERT INTO songs(publisher, title, description, thumbnail, public, path)
VALUES (44, "Beautiful Music2", "A beautiful music...", "xd", true, "/songs/aBeautifulHash");

SELECT "Hola mundo" AS saludo;
SELECT 1=1 AS resultado;

SELECT * FROM songs;
SELECT * FROM playlists;
SELECT * FROM playlists_songs;
# Songs that are in some playlist
SELECT songs.title, 
songs.id AS idSong, 
songs.id IN (SELECT songs.id AS idSong FROM playlists_songs JOIN songs ON playlists_songs.id_song=songs.id WHERE playlists_songs.id_playlist=5) AS inPlaylist 
FROM songs;

# Playlists that have already have some song
SELECT * FROM songs;
DELETE FROM songs WHERE id>0;
SELECT * FROM playlists;
SELECT * FROM playlists_songs;
SELECT * FROM users;
SELECT * FROM songs;

SELECT * FROM playlists;
SELECT songs.id, songs.title, songs.description, songs.thumbnail, songs.path,
users.id AS publisher_id, users.username AS publisher_username
FROM playlists_songs 
JOIN songs 
ON playlists_songs.id_song=songs.id 
JOIN users
ON songs.publisher=users.id
WHERE playlists_songs.id_playlist=14;

SELECT id, name, id IN (SELECT playlists.id FROM playlists_songs JOIN playlists ON playlists_songs.id_playlist=playlists.id WHERE id_song=1) AS containsSong  FROM playlists WHERE owner=44;

SELECT * FROM playlists;
SELECT * FROM playlists WHERE owner=45;
INSERT INTO playlists(owner, name, public)
VALUES (45, "myMysic2", true);

SELECT * FROM playlists_songs WHERE id_playlist=1 AND id_song=1;
SELECT * FROM playlists_songs;
INSERT INTO playlists_songs(id_playlist, id_song)
VALUES (1, 2);

SELECT * FROM playlists WHERE owner=45;
SELECT id_song FROM playlists_songs WHERE id_playlist=1;
SELECT * FROM songs WHERE id IN (SELECT id_song FROM playlists_songs WHERE id_playlist=1);

SELECT * FROM songs;
SELECT * FROM users;
UPDATE users
SET role=10
WHERE id=45;
UPDATE songs SET genre="other" WHERE id>0;
SELECT songs.id, songs.publisher, songs.title, songs.description, songs.thumbnail, songs.public, songs.path, songs.genre,
users.id AS publisher_id, users.username AS publisher_username
FROM songs 
JOIN users 
ON songs.publisher=users.id ORDER BY songs.id DESC;

SELECT songs.id, songs.publisher, songs.title, songs.description, songs.thumbnail, songs.public, songs.path, songs.genre,
users.id AS publisher_id, users.username AS publisher_username
FROM songs 
JOIN users
ON songs.publisher=users.id
WHERE songs.genre="electronic"
ORDER BY songs.id DESC;

SELECT songs.id, songs.publisher, songs.title, songs.description, songs.thumbnail, songs.public, songs.path, songs.genre,
users.id AS publisher_id, users.username AS publisher_username
FROM songs 
JOIN users
ON songs.publisher=users.id
WHERE songs.title LIKE "%a%"
ORDER BY songs.id DESC;
SELECT * FROM songs;