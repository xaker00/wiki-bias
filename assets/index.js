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

function renderSearchBar(){
  var searchBarResultPage = $('<div>').text("hey");
  $('main').prepend(searchBarResultPage);
  
}

var description = "";    //initializing variables for decripton
var j = 0;  //initializing variable to increment through the array of titles, page id, etc.
function search(searchTerm) {
    var mainEl = $('main').empty();

    renderSearchBar();

    mainEl.text(searchTerm);
    wikiSearch(searchTerm)
        .then(function (data) {
            console.log('data from callback', data);

            pageIds = data[4];

            //render search results here    
            displaySearchResults(data);
            


            console.log('page IDs', pageIds);

            for (var i = 1; i < pageIds.length; i++) {
                wikiText(pageIds[i])
                    .then(function (data2) {
                        console.log(data2);
                        
                        
                        return data2;
                    })
                    .then(function (data2) {
                        processText(data2).then(function (score) {
                            displaySearchResults(data);  //Moving displaySearchResults function inside the forloop. Removing the forloop in the function.
                            displayDescript(data2)       //Runs the function that displays the first few sentences of the wiki page.


                            // add sentiment score to results here  
                            displaySentinentScore(i, score);
                        });
                    });
            }


        });
}

function displayDescript(data2){
  var rowE3 = $('<div>').attr('id', 'description').text(" DESCRIPTION: "+data2.substring(0,200)+("...")); //adds a div containing the first 200 letters of the wiki page.
  $('main').append(rowE3);
}

function displaySearchResults(data){
  console.log('displaySearchResults data', data);
  
  /* data array 
  0 search term
  1 titles
  2 ?
  3 URLs
  4 page id
  */

  var titles = data[1];
  var urls = data[3];
  var pageID=data[4];
  console.log(description);
  
  var rowEl = $('<div>').attr('id', 'result'+j).text(titles[j]);
  var rowE2 = $('<div>').attr('id', 'result'+j).text(urls[j]);

  $('main').append(rowEl);
  $('main').append(rowE2);
  j++; //increments to update the title and url to the next element in the array.
  
   
  
}

function displaySentinentScore(i, score){
  console.log('displaySentinentScore', i);  
  $(`#result${i}`).text(score);
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
 
