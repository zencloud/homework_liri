// LIRI Application
// Request entertainment information from a CLI

// App Uses Strict Mode
"use strict";

// Init: Environment Variables
require("dotenv").config();
let app = require('./functions');

// Init: Core search module
const search = require('./search');
let findMedia = new search();

// --- End Config
// ------------------------------------------------------------
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

    // Setup Query
    let inputType = userCMD[2];
    let inputQuery = userCMD.splice(3).join(' ');

    // Determine command
    switch (inputType) {
        // No break to change command to random

        case 'random-command':
            //
            break;

        // Search Bands In Town
        case 'concert-this':

            // Missing Parameter
            if (!inputQuery) {
                // No search parameter found, set default 
                findMedia.concert('Eminem');
            }

            // Begin Search
            if (inputQuery) {
                findMedia.concert(inputQuery);
            }
            break;

        // Search by song titles from spotify
        case 'spotify-this':

            // Missing params, default to The Sign by Ace of Base
            if (!inputQuery) {
                findMedia.spotify('The Sign Ace of Base');
            }

            // Search spotify for user query
            if (inputQuery) {
                findMedia.spotify(inputQuery);
            }
            break;
        
        // Search OPENMDB
        case 'movie-this':

            // Missing Params
            if (!inputQuery) {
                App.printe('Missing Parameters!');                
            }

            // Movie Search
            if (inputQuery) {
                findMedia.movie(inputQuery);
            }
            break;

        case 'do-what-it-says':
            // Do what it says?
            break;

        default:
            app.printe(`Unknown LIRI Command: ${inputType}`);
            break;
    }
}