var newsAmount=0;
var newsArray=[];
$.getJSON('../json/news.json', function(data) {
    newsArray=data.news;
});
$.getJSON('../json/news.json', function(data){});
var pageLimit=9;
var currentPage=1;
function numPages(array){
    if(array==null){
        newsAmount=newsArray.length;
    }
    else{
        newsAmount= array.length;
    }
    return Math.ceil(newsAmount / pageLimit);
}
function prevPage(array){
    if(array==null){
        if (currentPage > 1) {
            currentPage--;
            changePage(currentPage, newsArray);
        } 
    }   
    if (currentPage > 1) {
        currentPage--;
        changePage(currentPage, array);
    }
}
function nextPage(array){
    if(array==null){
        if (currentPage < numPages()) {
            currentPage++;
            changePage(currentPage, newsArray);
        }
    }   
    if (currentPage < numPages()) {
        currentPage++;
        changePage(currentPage, array);
    }
}
function changePage(page, array){
    var buttonNext = document.getElementById("next");
    var buttonPrev = document.getElementById("prev");
    var newsDiv = document.getElementById("news");
    var page_span = document.getElementById("page");
    var pages_span = document.getElementById("pages");
     if (page < 1) page = 1;
    if (page > numPages(array)) page = numPages(array);

    newsDiv.innerHTML = "";
        for (var i = (page-1) * pageLimit; i < (page * pageLimit); i++) {
            var card="<div class='news-card-wrapper "+array[i].type+"'><div class='news-card'><img src='"+array[i].imageURL+"'><h1>"+array[i].title+"</h1><h5>"
                    +array[i].date+" | "+array[i].type+"</h5><p>"+array[i].description+"</p></div></div>"
            $(card).appendTo("#news");
            page_span.innerHTML = page;
            pages_span.innerHTML = numPages(array);
            if (page == 1) {
                buttonPrev.style.visibility = "hidden";
            } else {
                buttonPrev.style.visibility = "visible";
            }

            if (page == numPages(array)) {
                buttonNext.style.visibility = "hidden";

            } else {
                buttonNext.style.visibility = "visible";
            }
        } 
    
}
function nameAscending(array){
    array.sort(function(a, b){
        if(a.title < b.title) { return -1; }
        if(a.title > b.title) { return 1; }
        return 0;
    })
    console.log(array);
    $("#news").empty();
    $(".asc").css("display", "none");    
    $(".desc").css("display", "inline-block");    
    changePage(1,array);
}
function nameDescending(array){
    array.sort(function(a, b){
        if(a.title > b.title) { return -1; }
        if(a.title < b.title) { return 1; }
        return 0;
    })
    console.log(array);
    $("#news").empty();
    $(".desc").css("display", "none");    
    $(".asc").css("display", "inline-block");    

    changePage(1,array);
}
function filterSelection(value){
    
    if(value==='all'){
        $("#news").empty();
        highlightButton();
        changePage(1,newsArray);
    }
    else{
        $("#news").empty();
        var filtered = newsArray.filter(function(number) {
            return number.type==value;
          });
          highlightButton();

        changePage(1,filtered);    
    }  
   
}
function highlightButton(){
    var btnContainer = document.getElementById("filter-buttons-wrapper");
    var btns = btnContainer.getElementsByClassName("btn");
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
            var current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";
        });
    }
}
function search(value){
    $("#news").empty();
    var filteredArray=[];
    var findStr = $('#search').val();
    for (var i=0; i <newsAmount; i++) {
        var isContaining=false;

        while(isContaining===false){
            // alert(isContaining);
            counter=0;
            for (var key in newsArray[i]) {
                if(newsArray[i][key].indexOf(findStr) !== -1){
                    filteredArray.push(newsArray[i]);
                    isContaining=true;
                }
            }
            isContaining=true;
            // alert(isContaining);
        }
    }
    changePage(1, filteredArray);

}
window.onload = function() {
    changePage(1,newsArray);  
   
};

