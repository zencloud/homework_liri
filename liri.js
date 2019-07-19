// LIRI Application
// Request entertainment information from a CLI


// App Uses Strict Mode
"use strict";

// Init: Environment Variables
require("dotenv").config();

// Modules
const App = require('./functions.js');
const Spotify = require('node-spotify-api');
const Axios = require('axios');
const Moment = require('moment');

// Keys: Load keys
let appKeys = require("./keys.js");
let spotifySearch = new Spotify(appKeys.spotify);

// --- End Config

// --- Begin Application

// Get CLI input
let userCMD = process.argv;

// Input Validation
// Input format invalid
if (userCMD.length !== 4) {
    App.printe('Not enough parameters');
}

// Input format correct. Parse values.
if (userCMD.length === 4) {

    switch (userCMD[2]) {

        case 'concert-this':
            Axios.get(`https://rest.bandsintown.com/artists/${userCMD[3]}/events?app_id=codingbootcamp`)
                .then(function (reply) {

                    // Setup veny object from reply
                    let venuData = reply.data[0];

                    // Datetime converse for venue time
                    let venuDate = Moment(venuData.datetime).format('MM/DD/YYYY') + ' at ' + Moment(venuData.datetime).format('h:mma');
                    App.printd(`Results for: ${userCMD[3]}`);
                    App.printl(`Venu Name: ${venuData.venue.name}`);
                    App.printl(`Venu Location: ${venuData.venue.city} ${venuData.venue.region}`);
                    App.printl(`Venu Date: ${venuDate}`)

                });
            break;

        case 'spotify-this':
            // Spotify
            break;

        case 'movie-this':
            // Movie
            break;

        case 'do-what-it-says':
            // Do what it says?
            break;

        default:
            App.printe(`Unknown LIRI Command: ${userCMD[2]}`);
            break;
    }
}