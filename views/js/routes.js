// var booking = require("./www/js/booking.js");
var fs = require("fs");
var appRouter = function (app) {
 
  app.post("/booking", function(req, res) {
    var file = fs.readFileSync("./views/json/rooms.json");
    var data=JSON.parse(file);
    var roomsArray=data;

    var order=convertRequestToOrderFormat(req);
    checkRoomsAviability(roomsArray, order);
    
    var resultData=JSON.stringify(roomsArray, null,2);
    fs.writeFile("./views/json/rooms.json", resultData, finished);
    if(checkRoomsAviability(roomsArray, order)===null){
      res.redirect("booking.html?error=error");
    }
    else{
      res.redirect("success.html");
    }
  });

}
function convertRequestToOrderFormat(req){
    var order={
      "type":req.body.type,
      "booking":{
        "startDate":req.body.startDate,
        "endDate":req.body.endDate,
        "name":req.body.name,
        "phonenumber":req.body.phonenumber,
        "email":req.body.email
      }
    }
    return order;
}
function finished(err){

}

function checkRoomsAviability(rooms, order){
  var orderStartDate=order.booking.startDate;  
  var orderEndDate=order.booking.endDate;  
  for(i=0; i<rooms.length;i++){
      if(rooms[i].type===order.type){
       
          if(isAvailableForBooking(rooms[i], orderStartDate, orderEndDate)){
              rooms[i].booking.push(order.booking);
              console.log("is Avali");
              return rooms[i];
          };
      }
  }
  return null;
}
function isAvailableForBooking(room, orderStart, orderEnd){
  for(j=0; j<room.booking.length; j++){
      var startDate=new Date((room.booking[j].startDate));                
      var endDate=new Date((room.booking[j].endDate));
      var orderStartDate = new Date(orderStart);  
      var orderEndDate = new Date(orderEnd);  
      if(hasDateConflict(orderStartDate, orderEndDate, startDate, endDate)){
          return false;
      }  
  }
  return true;
}
function hasDateConflict(orderStartDate, orderEndDate, startDate, endDate){
  if(orderEndDate<orderStartDate){
      return true;
  }
  if((orderStartDate<=startDate)&&(orderEndDate>=endDate)){
      return true;
  }
  if((orderStartDate>=startDate)&&(orderEndDate<=endDate)){
      return true;
  }
  else{
      return false;
  }
}
module.exports = appRouter;
