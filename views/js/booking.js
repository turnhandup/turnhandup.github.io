var roomsArray =[]
var order =[];

function getJsonFromUrl(url_string) {
    var url = new URL(url_string);
    var c = url.searchParams.get("error");
    if(c==="error"){
        document.getElementById("error").style.display="block";
    }
}
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
function createOrder(){
    var checkInDate = document.getElementById("dateCheckIn").value +" 15:00";
    var checkOutDate = document.getElementById("dateCheckOut").value +" 11:00";
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
function changeDatepickerStartDate(datepickerId){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
     if(dd<10){
            dd='0'+dd
        } 
        if(mm<10){
            mm='0'+mm
        } 
    
    today = yyyy+'-'+mm+'-'+dd;
    document.getElementById(datepickerId).setAttribute("min", today);
}
var saveData=function(text){
    var data = JSON.parse(text);
    roomsArray=data.rooms;
    console.log(roomsArray);
};
// module.exports = checkRoomsAviability(roomsArray, order);

window.onload = function() {
    console.log(getJsonFromUrl(window.location.href));
    // readTextFile("json/rooms.json", saveData);
    // changeDatepickerStartDate("dateCheckIn");
    // var submit = document.getElementById("submit");
    // submit.onclick=function(){
    //     console.log("clicked");
    //     var order=createOrder();
    //     checkRoomsAviability(roomsArray, order);
    // }
};

