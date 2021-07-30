/*
    This is the main script aka "the glue"

    Process user input and DOM manipulation in this file.
    Use functions defined in google-api.js and wiki-api.js to interface with the apis.
    Do not put any api requests here.

*/

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