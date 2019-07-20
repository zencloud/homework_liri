// Require Axios to get results
let axios = require('axios');
let app = require('./functions');
let moment = require('moment');
let spotify = require('node-spotify-api');

// Keys: Load keys for spotify
let appKeys = require("./keys.js");
let spotifySearch = new spotify(appKeys.spotify);

// Search Construct
let Search = function () {

    // Concert Search
    this.concert = function (query) {
        axios.get(`https://rest.bandsintown.com/artists/${query}/events?app_id=codingbootcamp`)
            .catch(function (error) {
                app.printe(error);
            })
            .then(function (reply) {

                // Valiation
                if (reply.data === `\n{warn=Not found}\n`) {
                    app.printe(`No search results for ${query}`);
                    return null;
                }

                // Setup veny object from reply
                let venuData = reply.data[0];

                // Datetime converse for venue time
                let venuDate = moment(venuData.datetime).format('MM/DD/YYYY') + ' at ' + moment(venuData.datetime).format('h:mma');
                app.printd(`Results for: ${query}`);
                app.printl(`Venu Name: ${venuData.venue.name}`);
                app.printl(`Venu Location: ${venuData.venue.city} ${venuData.venue.region}`);
                app.printl(`Venu Date: ${venuDate}`);
            });
    }

    this.spotify = function (query) {
        // Create Song Query
        let spotifyQueryConfig = {
            type: 'track',
            query: query,
            limit: 1
        }

        // Search spotify for user input
        spotifySearch.search(spotifyQueryConfig)
            .catch(function (error) {
                //app.printe(JSON.parse(error.message));
            })
            .then(function (reply) {

                let trackInfo = reply.tracks.items[0];
                app.printd(`Results for: ${query}`);
                app.printl(`Song Name: ${trackInfo.name}`);
                app.printl(`Artist Name: ${trackInfo.artists[0].name}`);
                app.printl(`Album: ${trackInfo.album.name}`);
                app.printl(`Preview: ${trackInfo.preview_url}`)
            });
    }
    
    // Movie This 
    this.movie = function (query) {
        axios.get(`http://www.omdbapi.com/?apikey=trilogy&t=${query}`)
            .catch(function (error) {
                app.printe(error);
            })
            .then(function (reply) {

                // Movie Data
                let movieData = reply.data;
                app.printd(`Search for: ${query}`);
                app.printl(`Movie Name: ${movieData.Title}`);
                app.printl(`Year: ${movieData.Year}`);
                app.printl(`IMDB Rating: ${movieData.imdbRating}`);
                app.printl(`Rotten Tomatoes: ${movieData.Ratings[1].Value}`);
                app.printl(`Country: ${movieData.Country}`);
                app.printl(`Language: ${movieData.Language}`);
                app.printl(`Plot: ${movieData.Plot}`);
                app.printl(`Actors: ${movieData.Actors}`);
            });
    }
};


module.exports = Search;