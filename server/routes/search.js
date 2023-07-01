
import axios from "axios";
var express = require('express');
var router = express.Router();

var callbackModule = require('./callback.js');

router.get("/youtube/search", function (req, res) {

    let results = undefined;

    const config = {
        headers:{
            Authorization: 'Bearer ' + callbackModule.youtubeAccessToken,
            Accept:  'application/json'
        }
    };

    // console.log("YYYYYYY: " + req.params.searchTerm);

    let encoded = encodeURIComponent(req.query.searchTerm);

    axios
        .get("https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=" + encoded +"&key=AIzaSyAfoqGxQyF5tOyjjNeAiK8CIQrOaLLn5cQ", config)
        .then((r) => {
            results = (r.data.items);
        });

    res.json(results);
});




module.exports = router;