window.onload = function() {
    function addCommas(nStr) {
       nStr += '';
       var x = nStr.split('.');
       var x1 = x[0];
       var x2 = x.length > 1 ? '.' + x[1] : '';
       var rgx = /(\d+)(\d{3})/;
       while (rgx.test(x1)) {
               x1 = x1.replace(rgx, '$1' + ',' + '$2');
       }
       return x1 + x2;
   }
   var number = 62371673;
   const getMonthsPassed = () => {
       const startDate = new Date(2018, 10, 22); // month start at 0, so month-1 should be used
       const currentDate = new Date();
       const monthDifference =
       (currentDate.getFullYear() - startDate.getFullYear()) * 12 +
       (currentDate.getMonth() - startDate.getMonth());
       return monthDifference;
   };
   if(getMonthsPassed!==1){
       number = number + 1575042*getMonthsPassed();
       var numberFormatted=addCommas(number.toString());
       document.getElementById("number").innerHTML = numberFormatted;
   }
   else{
       var numberFormatted=addCommas(number.toString());

       document.getElementById("number").innerHTML = numberFormatted;
   }
};
  