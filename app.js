var express = require('express');

var  routes = require('./routes.js');
var app = express();

app.use('/', routes);

var http = require('http');

var listener = app.listen(8080, function(){
    console.log('Listening on port ' + listener.address().port); //Listening on port 8080
});

module.exports = app;
