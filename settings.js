var fs=require("fs");
// var booking = require('www/js/booking.js');
var routes = require("./www/js/routes.js");

var express = require('express')
var app = express()

app.use(express.static('www'));
routes(app);

var server = app.listen(8000, function () {

    var host = server.address().address
    var port = server.address().port

	console.log('Express app listening at http://%s:%s', host, port)
	
	 var data = fs.readFileSync("www/json/rooms.json");

		// // var words=JSON.parse(data);
		// // console.log(words);;
		// var rArray = JSON.parse(data);
		// var order={
		// 	"type":"Single King",
		// 	"booking":
		// 		{
		// 			"startDate":"2018-12-15 15:00",
		// 			"endDate":"2018-12-17 11:00",
		// 			"name":"Josh",
		// 			"phonenumber":"+380653085325",
		// 			"email":"turnhandup@gmail.com"
		// 		}
		// };
		// var roomsArray=rArray.rooms;
		
		// console.log(booking.checkRoomsAviability(roomsArray,order));

		// 		var resultData=JSON.stringify(words, null,2);
		// fs.writeFile("room.json", resultData, finished);
		// function finished(err){}
})
// var express = require("express");
// var bodyParser = require("body-parser");
// var routes = require("./www/js/routes.js");
// var app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// routes(app);

// var server = app.listen(8000, function () {
//     console.log("app running on port.", server.address().port);
// });