var express = require('express');
var querystring = require('querystring');
var router = express.Router();
var spotifyStateKey = 'spotify_auth_state';
var youtubeStateKey = 'google_auth_state';

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

/* API endpoint for login. */
router.get('/spotify', function(req, res) {

    var state = generateRandomString(16);
    res.cookie(spotifyStateKey, state);

    // your application requests authorization
    // var scope = 'user-read-private user-read-email user-read-currently-playing user-modify-playback-state';
    var scope = 'streaming user-read-email user-read-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state';
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: process.env.SPOTIFY_CLIENT_ID,
            scope: scope,
            redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
            state: state
        }));
});

router.get('/youtube', function(req, res) {

    var state = generateRandomString(16);
    res.cookie(youtubeStateKey, state);

    // your application requests authorization
    // var scope = 'user-read-private user-read-email user-read-currently-playing user-modify-playback-state';
    // var scope = 'streaming user-read-email user-read-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state';
    let scope = 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email';


    // "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http://localhost:3000&client_id=934374130370-fbe30ifh366vjc1ut5t4j3i6a4i066m4.apps.googleusercontent.com&access_type=offline&response_type=code&prompt=consent&"

    res.redirect('https://accounts.google.com/o/oauth2/v2/auth?' +
        querystring.stringify({
            redirect_uri: process.env.YOUTUBE_REDIRECT_URI,
            client_id: process.env.YOUTUBE_CLIENT_ID,
            access_type: 'offline',
            response_type: 'code',
            prompt: 'consent',
            scope: scope,
            state: state
        }));
});

module.exports = router;