const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
require('dotenv').config();

/* Import Routes */
const home = require('./routes/home');
const callback = require('./routes/callback');
const error = require('./routes/error');
const login = require('./routes/login');
const refresh = require('./routes/refresh');
const queue = require('./routes/queue');
const cors = require('cors');


/* Instansiate the App */
const app = express();
app.set('port', (process.env.PORT || 3001))

/* App setup */
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
app.use(cors());

/* View Engine setup */
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

/* Routes setup */
app.use('/', home);
app.use('/callback', callback);
app.use('/error', error);
app.use('/login', login);
app.use('/refresh', refresh);
app.use('/queue', queue);

app.get('*',function (req, res) {
    res.redirect('/');
});

/* Error Handlers */
// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handler
app.use(function(err, req, res, next) {
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

/* App Go! */
app.listen(app.get('port'), function() {
    console.log("Spotify Auth Code token exchange is running on:" + app.get('port'))
})