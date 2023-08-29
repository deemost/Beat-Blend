const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const http = require("http");
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const logger = require('morgan');
const {WebSocketServer} = require("ws");
const clients = [];
require('dotenv').config();

/* Import Routes */
const callback = require('./routes/callback');
const login = require('./routes/login');
const refresh = require('./routes/refresh');
const queue = require('./routes/queue');
const search = require('./routes/search');
const room = require('./routes/room');

// const myWebSocketRoute = require("./routes/queue");

const cors = require('cors');



/* Instantiate the App */

app.set('port', (process.env.PORT || 3001));




/* App setup */
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
app.use(cors());
// myWebSocketRoute(server);



/* Routes setup */
app.use('/callback', callback);
app.use('/login', login);
app.use('/refresh', refresh);
app.use('/queue', queue);
app.use('/search', search);
app.use('/room', room);

const server = http.createServer(app);


app.listen(app.get('port'), function () {
    console.log("Server is running on:" + app.get('port'))
});
server.listen(8082, () => {
    console.log(`Server is running on port 8082`);
});


/* WebSockets Attempt */

const wss = new WebSocketServer({server});


wss.on("connection", (client) => {

    // app.locals.clients = wss.clients;

    console.log("New client connected!");
    client.send("hello?");

    clients.push(client);


    client.on("close", () =>{
        console.log("Client Gone");
        const index = clients.indexOf(client);
        clients.splice(index, 1);
        clients.forEach((c)=>{
            console.log("still here!!");
        });
    });

    app.locals.clients = clients;

});

