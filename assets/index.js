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
            

            //console.log('page IDs', pageIds);

            Promise.all(
                pageIds.map(id => wikiText(id))
                //textArray
            )
            .then((text) => console.log(text));
        });

        console.log("fdsfdasf");
}

function displayDescription(i, data){
  const descriptionEl = $('#description' + i).empty();
  descriptionEl.text(data);
  
  //var rowE3 = $('<div>').attr('id', 'description').text(" DESCRIPTION: "+data2.substring(0,200)+("...")); //adds a div containing the first 200 letters of the wiki page.
  // $('main').append(rowE3);
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
  
  for(var i =0; i<titles.length; i++){

    //var rowEl = $('<div>').attr('id', 'result'+ i).text(titles[i]);
    //var rowE2 = $('<div>').attr('id', 'result'+ i).text(urls[i]);

    const containerEl = $('<div>');
    const titleEl = $('<div>').text(titles[i]);
    const urlEl = $('<div>').text(urls[i]);
    const descriptionEl = $('<div>').attr('id', 'description'+ i);
    const sentimentEl = $('<div>').attr('id', 'sentiment'+ i);

    containerEl.append(titleEl, urlEl, descriptionEl, sentimentEl);

    $('main').append(containerEl);
    

/*
<div id=result1>
    <div> title
    <div> URL
    <div id=description1>
    <div id=sentiment1>
</div>

*/



  }

  //$('main').append(rowEl);
  //$('main').append(rowE2);
  

  // for testing only - delete once API is working correctly
  for(let x=0; x<10; x++){
    displayDescription(x, 'Loading... ' + (1+x));
    displaySentimentScore(x, 'score ' + (1+x));
  }

   
  
}

function displaySentimentScore(i, score){
  const sentimentEl = $('#sentiment' + i).empty();
  sentimentEl.text(score);
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
 
