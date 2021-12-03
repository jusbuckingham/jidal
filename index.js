// Album Model: sequelize model:create --name Album --attributes title:string,year:integer,length:integer,tracks:integer
// Artist Model: sequelize model:create --name Artist --attributes name:string,monthlyListeners:integer,followers:integer
// Song Model: sequelize model:create --name Song --attributes title:string,length:integer,playCount:integer,likes:integer,explicit:boolean
// Playlist Model: sequelize model:create --name Playlist --attributes name:string

const express = require('express');

const {
    Playlist,
    Artist,
    Song,
    Album
} = require("./models");

const app = express();
const PORT = process.env.PORT || 8000;
const layouts = require('express-ejs-layouts');

app.set('view engine', 'ejs');
app.use(layouts);

app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');

    res.json({ message: "Welcome to Spotify 2.0" });
});

app.listen(PORT, function () {
    console.log('Server running on PORT', PORT);
});

app.get('/artists', function (req, res) {
    // get all artists
    Artist.findAll()
        .then(function (artistList) {
            console.log('FOUND ALL ARTISTS', artistList);
            res.render('artists', { artists: artistList })
        })
        .catch(function (err) {
            console.log('ERROR', err);
            res.json({ message: 'Error occured, please try again....' });
        });
});

app.get('/albums', function (req, res) {
    // get all albums
    Album.findAll()
        .then(function (albumList) {
            console.log('FOUND ALL ALBUMS', albumList);
            res.render('albums', { albums: albumList })
        })
        .catch(function (err) {
            console.log('ERROR', err);
            res.json({ message: 'Error occured, please try again....' });
        });
});

app.get('/songs', function (req, res) {
    // get all songs
    Album.findAll()
        .then(function (songList) {
            console.log('FOUND ALL SONGS', songList);
            res.render('songs', { songs: songList })
        })
        .catch(function (err) {
            console.log('ERROR', err);
            res.json({ message: 'Error occured, please try again....' });
        });
});

app.get('/playlists', function (req, res) {
    // get all playlists
    Album.findAll()
        .then(function (playList) {
            console.log('FOUND ALL PLAYLISTS', playList);
            res.render('playlists', { playlists: playList })
        })
        .catch(function (err) {
            console.log('ERROR', err);
            res.json({ message: 'Error occured, please try again....' });
        });
});

Artist.create({
    name: 'John Coltrane',
    followers: 500_000_000,
    monthlyListeners: 560_021_371
})
.then(function(newArtist) {
    console.log('NEW ARTIST', newArtist);
    // Add album
    newArtist.createAlbum({
        title: 'Giant Steps'
    })
    .then(function(newAlbum) {
        console.log('NEW ALBUM', newAlbum.toJSON())
    })
})
.catch(function(error) {
    console.log(error);
});

Album.create({
    title: 'Love Supreme',
    year: 1972,
    length: 30,
    tracks: 4
})
.then(function(newAlbum){
    console.log('NEW ALBUM', newAlbum.toJSON());
})
.catch(function(error) {
    console.log('ERROR', error);
});

