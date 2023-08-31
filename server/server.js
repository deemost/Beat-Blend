const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const socketIo = require("socket.io");
const http = require("http")
const PORT = process.env.PORT || 3001
const app = express();
const server = http.createServer(app);
const hostClientIds = [];
const guestClientIds = [];
app.set('hostIds', hostClientIds);
app.set('guestIds', guestClientIds);
require('dotenv').config();

const io = socketIo(server,{
    cors: {
        origin: process.env.FRONTEND_URL_PREFIX
    }
});

app.set('socketIoServer', io);

const cors = require('cors');


io.on("connection",(socket)=>{
    console.log("client connected: ",socket.id);

    socket.on("new host id", (id) => {
        if(!hostClientIds.includes(id)){
            hostClientIds.push(id);
        }
        console.log("host clients: " + hostClientIds);
    });

    socket.on("disconnect",(reason)=>{
        console.log(reason);
        if( hostClientIds.includes(socket.id)){
            hostClientIds.splice(hostClientIds.indexOf(socket.id), 1);
        }
        if( guestClientIds.includes(socket.id)){
            guestClientIds.splice(guestClientIds.indexOf(socket.id), 1);
        }
        console.log("host clients: " + hostClientIds);
    })
})


// const { createServer } = require("http");
// const { Server } = require("socket.io");
//
// const httpServer = createServer(app);
//
// const socketIo = new Server(httpServer);





// const socketIo = new Server(httpServer, {
//     cors: {
//         origin: process.env.FRONTEND_URL_PREFIX
//     }
// });


// socketIo.on('connection', (socket) => {
//
//     socket.on("connect", () => {
//         console.log("New client connected!");
//     })
//
//     console.log("New client connected!");
//     socket.send("hello?");
//
//     clients.push(socket);
//
//     socket.on('disconnect', () => {
//         console.log('🔥: A user disconnected');
//     });
//
//     app.locals.clients = clients;
//
//     // module.exports.clients = clients;
//
// });

server.listen(PORT, err=> {
    if(err) console.log(err)
    console.log("Server running on Port ", PORT);
})

// httpServer.listen((process.env.PORT || 3001), function () {
//     console.log("Server is running on: " + (process.env.PORT || 3001));
// });

app.use(cors());

// const {WebSocketServer} = require("ws");

/* Import Routes */
const callback = require('./routes/callback');
const login = require('./routes/login');
const refresh = require('./routes/refresh');
const queue = require('./routes/queue');
const search = require('./routes/search');
const room = require('./routes/room');

// const myWebSocketRoute = require("./routes/queue");





/* Instantiate the App */






/* App setup */
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
// myWebSocketRoute(server);



/* Routes setup */
app.use('/callback', callback);
app.use('/login', login);
app.use('/refresh', refresh);
app.use('/queue', queue);
app.use('/search', search);
app.use('/room', room);




// app.listen(app.get('port'), function () {
//     console.log("Server is running on:" + app.get('port'))
// });
// server.listen(8082, () => {
//     console.log(`Server is running on port 8082`);
// });


/* WebSockets Attempt */




// const wss = new WebSocketServer({server});
//
//
// wss.on("connection", (client) => {
//
//     // app.locals.clients = wss.clients;
//
//     console.log("New client connected!");
//     client.send("hello?");
//
//     clients.push(client);
//
//
//     client.on("close", () =>{
//         console.log("Client Gone");
//         const index = clients.indexOf(client);
//         clients.splice(index, 1);
//         clients.forEach((c)=>{
//             console.log("still here!!");
//         });
//     });
//
//     app.locals.clients = clients;
//
// });

