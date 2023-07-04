const express = require('express');
const querystring = require('querystring');
const router = express.Router();
const spotifyStateKey = 'spotify_auth_state';
const youtubeStateKey = 'google_auth_state';

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = function (length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

// ------------ spotify login redirect
router.get('/spotify', function (req, res) {

    const state = generateRandomString(16);
    res.cookie(spotifyStateKey, state);

    const scope =
        'streaming user-read-email ' +
        'user-read-private ' +
        'user-library-read ' +
        'user-library-modify ' +
        'user-read-playback-state ' +
        'user-modify-playback-state';
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: process.env.SPOTIFY_CLIENT_ID,
            scope: scope,
            redirect_uri: process.env.BACKEND_URL_PREFIX + process.env.SPOTIFY_REDIRECT_URI,
            state: state
        }));
});

// ------------ youtube login redirect
router.get('/youtube', function (req, res) {

    const state = generateRandomString(16);
    res.cookie(youtubeStateKey, state);

    const scope =
        'https://www.googleapis.com/auth/userinfo.profile ' +
        'https://www.googleapis.com/auth/userinfo.email ' +
        'https://www.googleapis.com/auth/youtube';

    res.redirect('https://accounts.google.com/o/oauth2/v2/auth?' +
        querystring.stringify({
            redirect_uri: process.env.BACKEND_URL_PREFIX + process.env.YOUTUBE_REDIRECT_URI,
            client_id: process.env.YOUTUBE_CLIENT_ID,
            access_type: 'offline',
            response_type: 'code',
            prompt: 'consent',
            scope: scope,
            state: state
        }));
});

module.exports = router;
