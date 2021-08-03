/*  
    Wikipedia API interface
*/

/**
 * Search Wikipedia
 * @param {*} searchTerm A string containing the search term(s)
 * @returns Promise with up to 10 search results
 */
function wikiSearch(searchTerm) {
    //console.log('running wikiSearch for ', searchTerm);
    var url = new URL("https://en.wikipedia.org/w/api.php");
    var params = {
        action: "opensearch",
        search: searchTerm,
        format: "json",
        origin: "*",
    };
    url.search = new URLSearchParams(params).toString();

    return fetch(url)
        .then((response) => response.json())
        .then(function (data) {
            // append an array of ids
            //console.log("wikiSearch", data);
            return wikiTitlesToIds(data[1])
                .then(function (ids) {
                    //console.log("wikiSearch", ids);
                    data.push(ids);
                    return data;
                });
        });
}


/**
 * Convert a list of Wikipedia titles to page IDs
 * @param {*} data Array of page titles
 * @returns Promise with and array of page IDs
 */
 function wikiTitlesToIds(data) {

    const getId = (title) => {
        const url = new URL('https://en.wikipedia.org/w/api.php');
        const params = {
            action: 'query',
            titles: title,
            format: 'json',
            origin: '*'
        }
        url.search = new URLSearchParams(params).toString();

        return new Promise(resolve => {
            return fetch(url)
                .then(response => response.json())
                .then(function (data) {
                    const result = Object.keys(data.query.pages)[0];
                    
                    //console.log('line 86', data, result);
                    resolve(result); // returns data?
                });
        });

    };

    // https://medium.com/developer-rants/running-promises-in-a-loop-sequentially-one-by-one-bd803181b283
    return Promise.all(
        data.map(d => getId(d))
    );
}


/**
 * Extracts the intro from a Wikipedia article
 * @param {*} pageId The page id
 * @returns A Promise with the introduction as a string
 */
function wikiText(pageId) {
    var url = new URL("https://en.wikipedia.org/w/api.php");
    var params = {
        action: 'query',
        prop: 'extracts',
        exlimit: 1,
        exintro: 1,
        pageids: pageId,
        explaintext: 1,
        formatversion: 2,
        format: "json",
        origin: "*",
    };
    url.search = new URLSearchParams(params).toString();

    return fetch(url)
        .then(response => response.json())
        .then(function (data) {
            //console.log('wikiText', data.query.pages[0].extract);
            return data.query.pages[0].extract;
        })
}

/**
 * Get a list of the most recent Wikipedia changes
 * @returns A Promise with recent changes
 */
function wikiLatestEdits() {
    return fetch('https://en.wikipedia.org/w/api.php?action=query&list=recentchanges&format=json&origin=*')
        .then(
            //response => console.log(response)
            response => response.json()
        )
        // .then(data => console.log(data));
        .then(function (data) {
            //console.log(data.query.recentchanges);
            return data.query.recentchanges;
        })
}