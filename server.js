var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan"); // logging
var mongoose = require('mongoose');
var engine = require('ejs-mate');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');

var User = require('./models/user');

var app = express();
mongoose.connect('mongodb://root:123abc@ds133961.mlab.com:33961/ecomm', function (err) {
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
  secret: "aaaaaaaaaaaaaa"
}));
app.use(flash());

app.engine('ejs', engine);
app.set('view engine', 'ejs');

// Router
var mainRouter = require('./routes/main');
app.use(mainRouter);

var userRouter = require('./routes/user');
app.use(userRouter);


app.listen(3000, function (err) {

})