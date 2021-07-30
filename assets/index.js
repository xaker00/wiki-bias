/*
    This is the main script aka "the glue"

    Process user input and DOM manipulation in this file.
    Use functions defined in google-api.js and wiki-api.js to interface with the apis.
    Do not put any api requests here.

*/

<<<<<<< HEAD
var clearIcon = $(".clear-icon");
var searchBar = $(".search");
var searchInput= "";


// searchBar.on("keyup", () => {
 
//   if(searchBar.val() && clearIcon.css("display:none")){
//     clearIcon.css("display:block")
//   } else if(!searchBar.val()) {
//     clearIcon.css("visibility:none");
//   }
// });


//searchBar.change(function(){
searchBar.on("keyup", () => {
  console.log('change');
  if(searchBar.val() == ''){
    clearIcon.addClass("hidden")
  }else{
    clearIcon.removeClass("hidden")
  }
});

searchBar.keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){

        searchInput=searchBar.val().trim();
        console.log(searchInput);
        search(searchInput);
    }
});

clearIcon.on("click", function(){
    searchBar.val("");
    clearIcon.addClass("hidden");
})



function search(searchTerm){
  var mainEl = $('main').empty();
  mainEl.text(searchTerm);
}


//search funtion paramenter of keyword



/*  non Jquery version of searchbar code
 $(".clear-icon").on("click",function(){
  searchBar.val()=="";
  clearIcon.css("visibility:hidden");
});

var clearIcon = document.querySelector(".clear-icon");
var searchBar = document.querySelector(".search");

searchBar.addEventListener("keyup", () => {
 console.log(searchBar.value);
  if(searchBar.value && clearIcon.style.visibility != "visible"){
    clearIcon.style.visibility = "visible";
  } else if(!searchBar.value) {
    clearIcon.style.visibility = "hidden";
  }
});

clearIcon.addEventListener("click", () => {
  searchBar.value = "";
  clearIcon.style.visibility = "hidden";
})
*/
=======
processText("This is a very boring project", processSentiment);
processText("This is a  fun project", processSentiment);

function processSentiment(data){
    console.log(data);
}


wikiLatestEdits(function(data){
    console.log('data from callback', data);
});


wikiSearch('donald trump', function(data){
    console.log('data from callback', data);

    pageIds=data[4];

    console.log(pageIds);

    wikiText(pageIds[0], function(data2){
        console.log(data2);
        processText(data2, processSentiment);

});
});

// wikiText(4848272, function(data){
//     console.log(data);
//     processText(data, processSentiment);
// });
>>>>>>> master
