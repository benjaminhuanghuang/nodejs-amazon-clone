var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan"); // logging
var mongoose = require('mongoose');
var engine = require('ejs-mate');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');
var MongoStore = require('connect-mongo')(session);    // Session storage
var passport = require('passport')

var User = require('./models/user');
var appConfig = require('./config/app_config');

var app = express();
mongoose.connect(appConfig.database, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to the database...");
    }
});
// Using middleware
app.use(express.static(__dirname + "/public"));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: appConfig.secretKey,
  store:new MongoStore({url:appConfig.database , autoReconnect:true })
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Add user field to every request
app.use(function(req, res, next)
{
    res.locals.user = req.user;
    next();
});

app.engine('ejs', engine);
app.set('view engine', 'ejs');

// Router
var mainRouter = require('./routes/main');
app.use(mainRouter);

var userRouter = require('./routes/user');
app.use(userRouter);

app.listen(appConfig.port, function (err) {

})