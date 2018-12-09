
var routes = require("./views/js/routes.js");
var engines = require('consolidate');


var express = require('express')
var app = express()
app.set('views', __dirname + '/views');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

app.use(express.static('views'));
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: false }))
routes(app);
var server = app.listen(8000, function () {
    var host = server.address().address
    var port = server.address().port
})