/*
    This is the main script aka "the glue"

    Process user input and DOM manipulation in this file.
    Use functions defined in google-api.js and wiki-api.js to interface with the apis.
    Do not put any api requests here.

*/

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
  wikiSearch('searchTerm')
        .then(function (data) {
            console.log('data from callback', data);

            pageIds = data[4]; 

            //render search results here      

            console.log('page IDs', pageIds);

            wikiText(pageIds[0])
                .then(function (data2) {
                    console.log(data2);
                    processText(data2).then(processSentiment);

                    // add sentiment score to results here

                });
        });
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
function apiTests() {
    processText("This is a very boring project").then(processSentiment);
    processText("This is a  fun project").then(processSentiment);

    function processSentiment(data) {
        console.log(data);
    }


    wikiLatestEdits()
        .then(function (data) {
            console.log('data from callback', data);
        });


    wikiSearch('Walt disney')
        .then(function (data) {
            console.log('data from callback', data);

            pageIds = data[4];

            console.log('page IDs', pageIds);

            wikiText(pageIds[0])
                .then(function (data2) {
                    console.log(data2);
                    processText(data2).then(processSentiment);

                });
        });

}

apiTests();
 
