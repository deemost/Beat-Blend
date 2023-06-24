var express = require('express');
var router = express.Router();


let queueResults = [];
let playingTrack;



router.post("/playingtrack", function (req, res) {

    // console.log(req.body.track);
    playingTrack = req.body.track;
    res.json({playingTrack})
    console.log(playingTrack);
});

router.get("/playingtrack", function (req, res) {

    res.json({playingTrack});
});


router.post("/", function (req, res) {

    // console.log(req.body.track);
    queueResults.push(req.body.track);
    res.json({queueResults})
});

router.get("/", function (req, res) {

    res.json({queueResults});
});


router.delete("/specific", function (req, res) {
    queueResults.splice(req.query.trackIndexInQueue, 1);
    res.json({queueResults})
});

router.delete("/all", function (req, res) {
    queueResults = [];
    res.json({queueResults})
});




module.exports = router;