var roomsArray =[]

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
    // return !
    // return !((orderStartDate>endDate||orderStartDate<startDate)&&(orderEndDate<startDate||orderEndDate>endDate))
    // &&((startDate>orderEndDate||startDate<orderStartDate)&&(endDate<orderStartDate||endDate>orderStartDate));
}
var order1={
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
            console.log("DATA CONFLICT");
            return false;
        }  
    }
    return true;
}
function createOrder(){
    var checkInDate = document.getElementById("dateCheckIn").value +" 15:00";
    // var checkInDate = new Date(document.getElementById("dateCheckIn").value +" 15:00");
    var checkOutDate = document.getElementById("dateCheckOut").value +" 11:00";
    // var checkOutDate = new Date(document.getElementById("dateCheckOut").value +" 11:00");
    var select = document.getElementById("type");
    var type=select.options[select.selectedIndex].value; 
    var name = document.getElementById("name").value; 
    var email = document.getElementById("email").value; 
    var phone = document.getElementById("phone").value; 
    var bookingOrder={
        "type":type,
        "booking":
            {
                "startDate":checkInDate,
                "endDate":checkOutDate,
                "name":name,
                "phonenumber":phone,
                "email":email
            }
    };
    return bookingOrder;
}
var order =[];
var saveData=function(text){
    var data = JSON.parse(text);
    roomsArray=data.rooms;

};

window.onload = function() {
    readTextFile("json/rooms.json", saveData);

    var submit = document.getElementById("submit");
    submit.onclick=function(){
    var order=createOrder();
    console.log(checkRoomsAviability(roomsArray,order));
    console.log(roomsArray);

    }
};

