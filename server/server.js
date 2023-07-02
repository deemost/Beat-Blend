const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
require('dotenv').config();

/* Import Routes */
const callback = require('./routes/callback');
const login = require('./routes/login');
const refresh = require('./routes/refresh');
const queue = require('./routes/queue');
const search = require('./routes/search');
const room = require('./routes/room');

const cors = require('cors');


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
