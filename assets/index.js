/*
    This is the main script aka "the glue"

    Process user input and DOM manipulation in this file.
    Use functions defined in google-api.js and wiki-api.js to interface with the apis.
    Do not put any api requests here.

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