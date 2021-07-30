/*  
    Wikipedia API interface
*/

function wikiSearch(searchTerm, callback){
    var url = new URL('https://en.wikipedia.org/w/api.php');
    var params = {
        action: 'opensearch',
        search: searchTerm,
        format: 'json',
        origin: '*'
    }
    url.search = new URLSearchParams(params).toString();   
    
    fetch(url)
    .then(response => response.json())
    .then(function(data){

        // append an array of ids
        wikiTitlesToIds(data[1], function(ids){
            data.push(ids);
        })

        console.log('wikiSearch', data);
        callback(data);
    })
}

function wikiTitlesToIds(data, callback)
{
    var url = new URL('https://en.wikipedia.org/w/api.php');
    var params = {
        action: 'query',
        titles: data.join('|'),
        format: 'json',
        origin: '*'
    }
    url.search = new URLSearchParams(params).toString();   
    
    fetch(url)
    .then(response => response.json())
    .then(function(data){
        //console.log('wikiUrlsToIds', data);
        var result = [];

        for(q in data.query.pages){
            result.push(q);
        }

        //console.log('wikiUrlsToIds result', result);
        callback(result);
    })


}


// https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exlimit=1&pageids=XXXXXXX&explaintext=1&formatversion=2
// https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exlimit=1&pageids=67142110&explaintext=1&formatversion=2
function wikiText(pageId, callback){
    // call the wiki api here and populate result
    fetch (`https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exlimit=1&pageids=${pageId}&explaintext=1&formatversion=2&format=json&origin=*`)
    .then(response => response.json())
    .then(function(data){
        console.log('wikiText', data.query.pages[0].extract);
        callback(data.query.pages[0].extract);
    })
}

// https://en.wikipedia.org/w/api.php?action=query&list=recentchanges
function wikiLatestEdits(callback){
    // call the wiki api here and populate result
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    // https://stackoverflow.com/questions/41967610/using-fetch-library-for-wikipedia-api-javascript
    fetch ('https://en.wikipedia.org/w/api.php?action=query&list=recentchanges&format=json&origin=*')
    .then(
        //response => console.log(response)
        response => response.json()
        )
    // .then(data => console.log(data));
    .then(function(data){
        console.log(data.query.recentchanges);
        callback(data.query.recentchanges);
    })
}