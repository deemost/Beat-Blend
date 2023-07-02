const express = require('express');
const router = express.Router();

let room;

const generateRoom = function (length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

router.get("/", function (req, res) {
    if (room == null) {
        room = generateRoom(4);
    }
    res.json({room});
});

router.post("/check", function (req, res) {
    console.log("checking room: " + JSON.stringify(req.body.room));
    let exists = false;
    if (room === req.body.room) {
        exists = true;
    }
    res.json({exists})
});

module.exports = router;
