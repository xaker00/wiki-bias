/*
    This is the main script aka "the glue"

    Process user input and DOM manipulation in this file.
    Use functions defined in google-api.js and wiki-api.js to interface with the apis.
    Do not put any api requests here.

*/

const clearIcon = $(".clear-icon");
const searchBar = $(".search");
var searchInput = "";

searchBar.on("keyup", () => {
  console.log("change");
  if (searchBar.val() == "") {
    clearIcon.addClass("hidden");
  } else {
    clearIcon.removeClass("hidden");
  }
});

searchBar.keypress(function (event) {
  const keycode = event.keyCode ? event.keyCode : event.which;
  if (keycode == "13") {
    searchInput = searchBar.val().trim();
    console.log(searchInput);
    search(searchInput);
  }
});

clearIcon.on("click", function () {
  searchBar.val("");
  clearIcon.addClass("hidden");
});

function renderSearchBar() {
  var searchBarResultPage = $("<div>").attr();
  $("main").prepend(searchBarResultPage);
}

function search(searchTerm) {
  //var mainEl = $("main").empty();
  $("#search-result").empty();
  $('.parent').css('height', 'auto');

  //renderSearchBar();

  wikiSearch(searchTerm).then(function (data) {
    //console.log('data from callback', data);

    pageIds = data[4];

    //render search results here
    displaySearchResults(data);

    //console.log('page IDs', pageIds);

    Promise.all(
      pageIds.map((id) => wikiText(id))
      //textArray
    ).then((text) => {
      //console.log(text);
      for (let i = 0; i < text.length; i++) {
        displayDescription(i, shorten(text[i], 200) + "...");

        processText(text[i]).then((scoreObj) => {
          displaySentimentScore(i, scoreObj.score);
        });
      }
    });
  });

  console.log("fdsfdasf");
}

// https://stackoverflow.com/a/40382963
// Shorten a string to less than maxLen characters without truncating words.
function shorten(str, maxLen, separator = " ") {
  if (str.length <= maxLen) return str;
  return str.substr(0, str.lastIndexOf(separator, maxLen));
}

function displayDescription(i, data) {
  const descriptionEl = $("#description" + i).empty();
  descriptionEl.text(data);
}

function displaySearchResults(data) {
  console.log("displaySearchResults data", data);

  /* data array 
  0 search term
  1 titles
  2 ?
  3 URLs
  4 page id
  */

  const titles = data[1];
  const urls = data[3];
  //var pageID = data[4];

  for (var i = 0; i < titles.length; i++) {
    const containerEl = $("<div>").addClass("card");
    const titleEl = $("<div>").addClass("card-content").text(titles[i]);
    const urlEl = $("<a>").text(urls[i]).attr("href", urls[i]);
    const descriptionEl = $("<div>").attr("id", "description" + i);
    const sentimentEl = $("<div>").attr("id", "sentiment" + i);

    containerEl.append(titleEl, urlEl, descriptionEl, sentimentEl);

    const htmlEl = `
    <div class="card m-1">
      <header class="card-header">
        <div class="card-header-title">
        <a href="${urls[i]}" target="blank">${titles[i]}</a><span class="sentiment" id="sentiment${i}"></span>
        </div>
      </header>
      <div class="card-content">
        <div class="content" id="description${i}">
        </div>          
    </div> 

    `;


    $("#search-result").append(htmlEl);//containerEl);

    /*
<div id=result1>
    <div> title
    <div> URL
    <div id=description1>
    <div id=sentiment1>
</div>

*/
  }

  // Show placeholder text
  for (let x = 0; x < 10; x++) {
    displayDescription(x, "Loading Description... ");
    displaySentimentScore(x, "Loading Score... ");
  }
}

function displaySentimentScore(i, score) {
  const sentimentEl = $("#sentiment" + i).empty();
  sentimentEl.text(score);
}

/*
function apiTests() {
  processText("This is a very boring project").then(processSentiment);
  processText("This is a  fun project").then(processSentiment);

  function processSentiment(data) {
    console.log(data);
  }

  wikiLatestEdits().then(function (data) {
    console.log("data from callback", data);
  });

  wikiSearch("Walt disney").then(function (data) {
    console.log("data from callback", data);

    pageIds = data[4];

    console.log("page IDs", pageIds);

    wikiText(pageIds[0]).then(function (data2) {
      console.log(data2);
      processText(data2).then(processSentiment);
    });
  });
}

//apiTests();
*/
