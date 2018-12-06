
var roomsArray =[]
// $.getJSON("../json/rooms.json", function(json) {
//     roomsArray = json.rooms;
// });
function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}



function hasDateConflict(orderStartDate, orderEndDate, startDate, endDate){
    return !((orderStartDate>endDate||orderStartDate<startDate)&&(orderEndDate<startDate||orderEndDate>endDate))
    &&((startDate>orderEndDate||startDate<orderStartDate)&&(endDate<orderStartDate||endDate>orderStartDate));
}
var order={
    "type":"Single King",
    "booking":
        {
            "startDate":"2018-12-15 15:00",
            "endDate":"2018-12-17 11:00",
            "name":"Josh",
            "phonenumber":"+380653085325",
            "email":"turnhandup@gmail.com"
        }
};
function checkRoomsAviability(rooms, order){
    var orderStartDate=new Date(order.booking.startDate);  
    var orderEndDate=new Date(order.booking.endDate);  
    for(i=0; i<rooms.length;i++){
        if(rooms[i].type===order.type){
            if(isAvailableForBooking(rooms[i], orderStartDate, orderEndDate)){
                return rooms[i];
            };
        }
    }
    return null;
}
function isAvailableForBooking(room, orderStartDate, orderEndDate){
    for(j=0; j<room.booking.length; j++){
        var startDate=new Date((room.booking[j].startDate));                
        var endDate=new Date((room.booking[j].endDate));  
        if(hasDateConflict(orderStartDate, orderEndDate, startDate, endDate)){
            return false;
        }  
    }
    return true;
}
var saveData=function(text){
    var data = JSON.parse(text);
    roomsArray=data.rooms;
    console.log(checkRoomsAviability(roomsArray,order));
};
window.onload = function() {
    readTextFile("json/rooms.json", saveData);

};