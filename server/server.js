const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const WebSocket = require("ws");
require('dotenv').config();

/* Import Routes */
const callback = require('./routes/callback');
const login = require('./routes/login');
const refresh = require('./routes/refresh');
const queue = require('./routes/queue');
const search = require('./routes/search');
const room = require('./routes/room');

const cors = require('cors');
const {WebSocketServer} = require("ws");


/* Instantiate the App */
const app = express();
app.set('port', (process.env.PORT || 3001))

/* App setup */
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
app.use(cors());


/* Routes setup */
app.use('/callback', callback);
app.use('/login', login);
app.use('/refresh', refresh);
app.use('/queue', queue);
app.use('/search', search);
app.use('/room', room);


app.listen(app.get('port'), function () {
    console.log("Server is running on:" + app.get('port'))
})


/* WebSockets Attempt */





const clients = [];
const wss = new WebSocketServer({port: 8082});

wss.on("connection", (client) => {
    console.log("New client connected!");

    // client.send("Test Message");

    clients.push(client);


    clients.forEach((c)=>{
        console.log("haleluhah!!");
        c.send("ITS RAINING MEN");
    })


    // client.send("ARE YOU ALL GETTING THIS??");
});







// class Clients {
//     constructor() {
//         this.clientList = {};
//         this.saveClient = this.saveClient.bind(this);
//     }
//     saveClient(username, client) {
//         this.clientList[username] = client;
//     }
// }
//
//
//
// const clients = new Clients();
// const wss = new WebSocketServer({port: 8082});
//
// wss.on("connection", (client) => {
//     console.log("New client connected!");
//
//     client.send("Test Message");
//
//     client.on("message", (msg) => {
//         const parsedMsg = JSON.stringify(msg);
//         clients.saveClient(parsedMsg.data, client);
//
//         console.log("List Test: " +  JSON.stringify(clients.clientList));
//     });
// });
