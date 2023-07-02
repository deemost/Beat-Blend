const axios = require('axios')
const express = require('express');
const router = express.Router();

const callbackModule = require('./callback.js');

const key = process.env.YOUTUBE_API_KEY

router.get("/youtube", function (req, res) {

    const config = {
        headers: {
            Authorization: 'Bearer ' + callbackModule.youtubeAccessToken,
            Accept: 'application/json'
        }
    };

    let encoded = encodeURIComponent(req.query.searchTerm);
    console.log("========= encoded: " + encoded);

    axios
        .get("https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=" +
            encoded +
            "&key=" +
            key, config)
        .then((r) => {
            let results = (r.data.items);
            console.log('===== yt search results: ' + JSON.stringify(results))
            res.json(results);
        });
});


module.exports = router;
