var express = require("express");
var morgan = require("morgan");
var app = express();

// Using middleware
app.use(morgan('dev'));

app.get('/', function(req, res){
    res.json("Hello");

});

app.listen(3000, function(err){

})