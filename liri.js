// LIRI Application
// Request entertainment information from a CLI

// App Uses Strict Mode
"use strict";

// Init: Environment Variables
require("dotenv").config();

// Init: Core search module
const fs = require('fs');
const app = require('./functions');
const search = require('./search');
const findMedia = new search();
const fileRandom = './random.txt';

let validateInput = function(inputType, inputQuery) {
        // Determine command
        switch (inputType) {

            case 'do-what-it-says':
                fs.readFile(fileRandom, 'utf8', function (error, data) {
                    data = data.split(',');
                    validateInput(data[0], data[1]);
                });
                break;
    
            // Search Bands In Town
            case 'concert-this':
                inputQuery ? findMedia.concert(inputQuery) : findMedia.concert('Eminem');
                break;
    
            // Search by song titles from spotify
            case 'spotify-this':
                inputQuery ? findMedia.spotify(inputQuery) : findMedia.spotify('The Sign Ace of Base');
                break;
    
            // Search OPENMDB
            case 'movie-this':
                inputQuery ? findMedia.movie(inputQuery) : app.printe('Missing Parameters!');
                break;
    
            default:
                app.printe(`Unknown LIRI Command: ${inputType}`);
                break;
        }
}

// --- End Config
// ------------------------------------------------------------
// --- Begin Application

// Get CLI input
let userCMD = process.argv;

// LIRI Tells you about itself
if (userCMD.length === 2) {
    app.printd();
    app.printd('LIRI:');
    app.printl('Language Interpretation and Recognition Interface');
    app.printd();
    app.printl('Available commands:');
    app.printl('liri concert-this <artist>');
    app.printl('liri spotify-this <song>');
    app.printl('movie-this <movie>');
    app.printl('do-what-it-says <movie>');

    // Terminate early because we have no reason to process anything else
    process.exit();
}

// Input format correct. Parse values.
if (userCMD.length >= 3) {

    // Setup Query
    let inputType = userCMD[2];
    let inputQuery = userCMD.splice(3).join(' ');

    // Log input
    fs.appendFile('log.txt', `${inputType}, ${inputQuery}`, function(){});
    
    // Validate input
    validateInput(inputType, inputQuery);
}