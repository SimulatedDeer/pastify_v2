
//Path: mainframe\controllers\playlistController.js
const Playlist = require('../models/playlist');

const playlistController = {
    //create a new playlist
    create: async (req, res) => {
        try {
            const playlist = await Playlist.create({
                name: req.body['name'],
                user: req.body['user_id']
            })
            res.status(200).json(playlist);
        } catch (err) {
            res.status(500).json("Error creating playlist: " + err);
        }
    },
    //read the playlist
    read: async (req, res) => {
        try {
            const playlist = await Playlist.findByPk(req.params.id);
            res.status(200).json(playlist);
        } catch (err) {
            res.status(500).json("Error reading playlist: " + err);
        }
    },
    //update the playlist by id
    update: async (req, res) => {
        try {
            const playlist = await Playlist.findByPk(req.params.id);
            playlist.update({
                name: req.body['name'],
                user_id: req.body['user_id']
            })
            res.status(200).json(playlist);
        } catch (err) {
            res.status(500).json("Error updating playlist: " + err);
        }
    },
    //delete the playlist by id
    delete: async (req, res) => {
        try {
            const playlist = await Playlist.findByPk(req.params.id);
            playlist.destroy();
            res.status(200).json(playlist);
        } catch (err) {
            res.status(500).json("Error deleting playlist: " + err);
        }
    },
    //get all playlists for a user
    getAllPlaylistsForUser: async (req, res) => {
        try {
            const playlists = await Playlist.findAll({
                where: {
                    user: req.body['user_id']
                }
            });
            res.status(200).json(playlists);
        } catch (err) {
            res.status(500).json("Error getting playlists: " + err);
        }
    },
    //add a song to a playlist
    addSongToPlaylist: async (req, res) => {
        try {
            const playlist = await Playlist.findByPk(req.params.id);
            playlist.addSong(req.body['song']);
            res.status(200).json(playlist);
        } catch (err) {
            res.status(500).json("Error adding song to playlist: " + err);
        }
    },
    //remove a song from a playlist
    removeSongFromPlaylist: async (req, res) => {
        try {
            const playlist = await Playlist.findByPk(req.params.id);
            playlist.removeSong(req.body['song']);
            res.status(200).json(playlist);
        } catch (err) {
            res.status(500).json("Error removing song from playlist: " + err);
        }
    },
    //get all songs in a playlist by id
    getSongsInPlaylist: async (req, res) => {
        try {
            const playlist = await Playlist.findByPk(req.params.id);
            const songs = await playlist.getSongs();
            res.status(200).json(songs);
        } catch (err) {
            res.status(500).json("Error getting songs in playlist: " + err);
        }
    }
}

module.exports = playlistController;