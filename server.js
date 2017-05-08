var express = require("express");
var morgan = require("morgan");
var mongoose = require('mongoose');


var app = express();
mongoose.connect('mongodb://root:123abc@ds133961.mlab.com:33961/ecomm', function(err){
    if (err){
        console.log(err);
    }
    else
    {
        console.log("Connected...");
    }
});
// Using middleware
app.use(morgan('dev'));

app.get('/', function(req, res){
    res.json("Hello");

});

app.listen(3000, function(err){

})