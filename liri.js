// LIRI Application
// Request entertainment information from a CLI


// App Uses Strict Mode
//"use strict";

// Init: Environment Variables
require("dotenv").config();

// Modules
const App = require('./functions.js');
const Spotify = require('node-spotify-api');
const Axios = require('axios');
const Moment = require('moment');
const FS = require('fs');

// Keys: Load keys
let appKeys = require("./keys.js");
let spotifySearch = new Spotify(appKeys.spotify);

// --- End Config

// --- Begin Application

// Get CLI input
let userCMD = process.argv;

// LIRI Tells you about itself
if (userCMD.length === 2) {
    App.printd();
    App.printd('LIRI:');
    App.printl('Language Interpretation and Recognition Interface');
    App.printd();
    App.printl('Available commands:');
    App.printl('liri concert-this <artist>');
    App.printl('liri spotify-this <song>');
    App.printl('movie-this <movie>');
    App.printl('do-what-it-says <movie>');

    // Terminate early because we have no reason to processing anything else
    process.exit();
}

// Input format correct. Parse values.
if (userCMD.length >= 3) {

    // Cycle through command options
    switch (userCMD[2]) {

        // Search Bands In Town
        case 'concert-this':

            // Missing Parameter
            if (!userCMD[3]) {
                // ERROR 
                App.printe('Missing search parameter!');
            }

            // Begin Search
            if (userCMD[3]) {
                Axios.get(`https://rest.bandsintown.com/artists/${userCMD[3]}/events?app_id=codingbootcamp`)
                    .catch(function (error) {
                        App.printe(error);
                    })
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
            }
            break;

        // Search by song titles from spotify
        case 'spotify-this':

            // Missing params
            if (!userCMD[3]) {
                App.printe('Missing Parameters!');
            }

            // Search spotify songs
            if (userCMD[3]) {

                // Create Song Query
                let spotifyQueryConfig = {
                    type: 'track',
                    query: userCMD[3],
                    limit: 1
                }

                // Search spotify for user input
                spotifySearch.search(spotifyQueryConfig)
                    .catch(function (error) {
                        //App.printe(JSON.parse(error.message));
                    })
                    .then(function (reply) {

                        let trackInfo = reply.tracks.items[0];
                        App.printd(`Results for: ${userCMD[3]}`);
                        App.printl(`Song Name: ${trackInfo.name}`);
                        App.printl(`Artist Name: ${trackInfo.artists[0].name}`);
                        App.printl(`Album: ${trackInfo.album.name}`);
                        App.printl(`Preview: ${trackInfo.preview_url}`)
                    });
            }
            break;
        
        // Search OPENMDB
        case 'movie-this':

            if (!userCMD[3]) {
                App.printe('Missing Parameters!');                
            }

            if (userCMD[3]) {
                Axios.get(`http://www.omdbapi.com/?apikey=trilogy&t=${userCMD[3]}`)
                    .catch(function(error) {
                        App.printe(error);
                    })
                    .then(function(reply) {
                        
                        // Movie Data
                        let movieData = reply.data;
                        App.printd(`Search for: ${userCMD[3]}`);
                        App.printl(`Movie Name: ${movieData.Title}`);
                        App.printl(`Year: ${movieData.Year}`);
                        App.printl(`IMDB Rating: ${movieData.imdbRating}`);
                        App.printl(`Rotten Tomatoes: ${movieData.Ratings[1].Value}`);
                        App.printl(`Country: ${movieData.Country}`);
                        App.printl(`Language: ${movieData.Language}`);
                        App.printl(`Plot: ${movieData.Plot}`);
                        App.printl(`Actors: ${movieData.Actors}`);
                    });
            }
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