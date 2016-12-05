var express = require('express');
var http    = require('http'),
  bodyParser = require('body-parser');

var port = process.env.PORT || 3000;
var app = express();

// To post and get json data
app.use(bodyParser.json());

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname ));

app.get('/', function(request, response) {

  response.sendFile(__dirname + '/create-polygon.html');

}).listen(port, function() {
  console.log("Listening on " + port);
});

