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

// Album.create({
//     title: 'Certified Lover Boy',
//     year: 2021,
//     length: 86,
//     tracks: 21
// })
// .then(function(newAlbum){
//     console.log('NEW ALBUM', newAlbum.toJSON());
// })
// .catch(function(error) {
//     console.log('ERROR', error);
// });

// Artist.findOne({
//     where: { name: 'Drake' }
// })
// .then(function(artist) {
//     console.log('FOUND ARTIST', artist.toJSON());
//     // find the album in the database (Certified Lover Boy)
//     // --------------------------------------------
//     Album.findOne({
//         where: { title: 'Certified Lover Boy' }
//     })
//     .then(function(album) {
//         console.log('FOUND ALBUM', album.toJSON());
//         artist.addAlbum(album); // artistId will get added to the album
//         artist.save(); // tell the SQL data to save the information as such....

//     })
//     .catch(function(err) {
//         console.log('ERROR', err);
//     })
//     // --------------------------------------------
// })
// .catch(function(err) {
//     console.log('ERROR', err);
// });

// Artist.findOne({
//     where: { name: 'Drake' }
// })
// .then(function(artist) {
//     console.log('FOUND ARTIST', artist.toJSON());
//     // Get all ABLUMS related to the artist
//     // --------------------------------------------
//     artist.getAlbums()
//     .then(function(albumList) {
//         console.log(albumList); // find the datatype
//     })
//     .catch(function(err) {
//         console.log('ERROR', err);
//     })
//     // --------------------------------------------
// })
// .catch(function(err) {
//     console.log('ERROR', err);
// });

// // Find the artist, then create the album
// Artist.findOne({
//     where: { name: 'Drake' }
// })
// .then(function(artist) {
//     console.log('FOUND ARTIST', artist.toJSON());
//     // find the album in the database (Certified Lover Boy)
//     // --------------------------------------------
//     artist.createAlbum({
//         title: "If You're Reading This, It's Too Late",
//         year: 2012,
//         tracks: 15,
//         length: 60,
//     })
//     .then(function(newAlbum) {
//         console.log('NEW ALBUM', newAlbum.toJSON());
//     })
//     .catch(function(err) {
//         console.log('ERROR', err);
//     });
//     // --------------------------------------------
// })
// .catch(function(err) {
//     console.log('ERROR', err);
// });

// Artist.findOne({
//     where: { name: 'Drake' },
//     include: [Album, Song]
// })
// .then(function(artist) {
//     console.log('ARTIST', artist.toJSON());
// })
// .catch(function(err) {
//     console.log('ERROR', err);
// });