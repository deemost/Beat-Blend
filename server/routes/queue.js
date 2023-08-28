const express = require('express');
const {WebSocketServer} = require("ws");
const router = express.Router();
// const wss = new WebSocketServer({path: "../server"});

let queueResults = [];
let playingTrack;


/* WebSockets Attempt */

const broadcast = (clients, message) => {

    clients.forEach((client) => {
            client.send(message);
    });
};


// ------------ queue
router.post("/playingtrack", function (req, res) {
    // console.log(req.body.track);
    playingTrack = req.body.track;
    res.json({playingTrack})
    console.log(playingTrack);


    broadcast(req.app.locals.clients, "Bark!");



    // let wss = req.wss
    //
    // wss.on('connection', (ws) => {
    //     ws.on('message',  (message) => {
    //         console.log('received: %s', message);
    //     });
    // });


    // let clients = req.clients;
    //
    // console.log("CLIENT COUNT AFTER PLAYING TRACK POST:" + JSON.stringify(clients));
    //
    // clients.forEach((c)=>{
    //     console.log("QUEUE IS SEEING THIS");
    //     // c.send("ITS RAINING MEN");
    // });



    // module.exports = (server, clients) => {
    //     // const wss = new WebSocketServer({ server });
    //
    //     console.log("CLIENT COUNT: " + clients.length);
    //
    //     clients.forEach((c)=>{
    //         console.log("QUEUE IS SEEING THIS");
    //         // c.send("ITS RAINING MEN");
    //     });
    // };



});

router.get("/playingtrack", function (req, res) {
    res.json({playingTrack});
});

router.post("/", function (req, res) {
    console.log("adding to queue: " + JSON.stringify(req.body.track));
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
