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

app.get('/', function(req, res) { 
    res.sendFile(__dirname + '/views/index.html');

    res.json({ message: "Welcome to Spotify 2.0" });
});

app.listen(PORT, function() {
    console.log('Server running on PORT', PORT);
});



// Album Model: sequelize model:create --name Album --attributes title:string,year:integer,length:integer,tracks:integer