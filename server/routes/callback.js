const express = require('express');
const querystring = require('querystring');
const request = require('request');
const {encode} = require("querystring");
const router = express.Router();
// const spotifyStateKey = 'spotify_auth_state';
const youtubeStateKey = 'google_auth_state';

let spotify_access_token = "";
let youtube_access_token = "";

// --------- spotify
router.get("/spotify/access", function (req, res) {
    res.json({access_token: spotify_access_token});
});

router.post("/spotify/access", function (req, res) {
    // console.log(req.body.track);
    spotify_access_token = (req.body.new_token);
    res.json({access_token: spotify_access_token})
});

router.get('/spotify', function (req, res, next) {

    // prepare a token request
    const code = req.query.code || null;
    const state = req.query.state || null;
    // const storedState = req.cookies ? req.cookies[spotifyStateKey] : null;
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: code,
            redirect_uri: process.env.BACKEND_URL_PREFIX + process.env.SPOTIFY_REDIRECT_URI,
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + (new Buffer(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
        },
        json: true
    };

    // Check to ensure the state matches.
    // if (state === null || state !== storedState) {
    //
    //     // if it doesn't, error!
    //     res.redirect('/error?' +
    //         querystring.stringify({
    //             error: 'state_mismatch'
    //         }));
    //
    // } else {
    //     // if state matches, clear the spotifyStateKey cookie, we're finished with it
    //     res.clearCookie(spotifyStateKey);
    // }

    // Request a token - todo: convert to use axios since `request` is DEPRECATED
    request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {

            // got a token
            spotify_access_token = body.access_token;
            const refresh_token = body.refresh_token;

            res.redirect(process.env.FRONTEND_URL_PREFIX + process.env.FINAL_RESPONSE_URI);

        } else {
            // or error
            res.redirect('/error?' +
                querystring.stringify({
                    error: 'invalid_token'
                }));
        }
    });
});


// --------- youtube
router.get("/youtube/access", function (req, res) {
    res.json({access_token: youtube_access_token});
});

router.post("/youtube/access", function (req, res) {
    // console.log(req.body.track);
    youtube_access_token = (req.body.new_token);
    res.json({access_token: youtube_access_token})
});

router.get('/youtube', function (req, res, next) {


    // prepare a token request
    const code = req.query.code || null;
    const state = req.query.state || null;
    const storedState = req.cookies ? req.cookies[youtubeStateKey] : null;
    console.log("TEST: " + storedState);
    const authOptions = {
        url: 'https://oauth2.googleapis.com/token',
        form: {
            code: code,
            redirect_uri: process.env.BACKEND_URL_PREFIX + process.env.YOUTUBE_REDIRECT_URI,
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + (new Buffer(process.env.YOUTUBE_CLIENT_ID + ':' + process.env.YOUTUBE_CLIENT_SECRET).toString('base64'))
        },
        json: true
    };

    // Check to ensure the state matches.
    if (state === null || state !== storedState) {
        // if it doesn't, error!
        res.redirect('/error?' +
            querystring.stringify({
                error: 'state_mismatch'
            }));

    } else {
        // if state matches, clear the spotifyStateKey cookie, we're finished with it
        res.clearCookie(youtubeStateKey);
    }

    // Request a token
    request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {

            // got a token
            youtube_access_token = body.access_token;
            const refresh_token = body.refresh_token;

            res.redirect(process.env.FRONTEND_URL_PREFIX + process.env.FINAL_RESPONSE_URI);

        } else {
            // or error
            res.redirect('/error?' +
                querystring.stringify({
                    error: 'invalid_token'
                }));
        }
    });
});

module.exports = router;
module.exports.youtubeAccessToken = youtube_access_token;
