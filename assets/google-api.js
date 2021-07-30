/*  
    Google Natural Language API interface
    https://cloud.google.com/natural-language
    https://cloud.google.com/natural-language/docs/quickstart?hl=en_US#quickstart-analyze-entities-cli


    https://language.googleapis.com/v1/documents:analyzeEntities?key=API_KEY

*/

var key = 'AIzaSyAXxKnXI2n5m5-G35b2SMuftIKM3Hga7RY';

// send {magnitude: 0.9, score: -0.9} to the callback
function processText(text, callback){
    var result = {magnitude: 0.9, score: -0.9};
    // call the google api here and populate result
    var url = 'https://language.googleapis.com/v1/documents:analyzeSentiment?key=' + key;

    // https://cloud.google.com/natural-language/docs/reference/rest/v1/documents/analyzeSentiment?hl=en_US
    fetch(url,{
        method: 'POST',
        body: JSON.stringify({
            // https://cloud.google.com/natural-language/docs/reference/rest/v1/documents?hl=en_US#Document
            document:{
                type: 'PLAIN_TEXT',
                // language: '',
                content: text
            },
            encodingType: 'UTF8'
        })
    })
    .then(response => response.json())
    .then(function(data){
        callback(data.documentSentiment);
    });
}