const express = require('express');
const router = express.Router();



let queueResults = [];
let playingTrack;

// ------------ queue
router.post("/playingtrack", function (req, res) {
    // console.log(req.body.track);
    playingTrack = req.body.track;
    res.json({playingTrack})
    console.log(playingTrack);

    req.app.get("socketIoServer").local.emit("update playing track", playingTrack);

});

router.get("/playingtrack", function (req, res) {
    res.json({playingTrack});
});

router.post("/", function (req, res) {
    console.log("adding to queue: " + JSON.stringify(req.body.track));
    queueResults.push(req.body.track);
    res.json({queueResults});

    req.app.get("socketIoServer").local.emit("update queue", queueResults);
});

router.get("/", function (req, res) {
    res.json({queueResults});
});

router.delete("/specific", function (req, res) {
    queueResults.splice(req.query.trackIndexInQueue, 1);
    res.json({queueResults});

    req.app.get("socketIoServer").local.emit("update queue", queueResults);
});

router.delete("/all", function (req, res) {
    queueResults = [];
    res.json({queueResults});

    req.app.get("socketIoServer").local.emit("update queue", queueResults);
});


module.exports = router;
