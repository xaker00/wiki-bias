/*  
    Wikipedia API interface
*/

/**
 * Search Wikipedia
 * @param {*} searchTerm A string containing the search term(s)
 * @returns Promise with up to 10 search results
 */
function wikiSearch(searchTerm) {
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
            return wikiTitlesToIds(data[1])
                .then(function (ids) {
                    data.push(ids);
                    //console.log("wikiSearch", data);
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
    var url = new URL('https://en.wikipedia.org/w/api.php');
    var params = {
        action: 'query',
        titles: data.join('|'),
        format: 'json',
        origin: '*'
    }
    url.search = new URLSearchParams(params).toString();

    return fetch(url)
        .then(response => response.json())
        .then(function (data) {
            //console.log('wikiUrlsToIds', data);
            var result = [];

            for (q in data.query.pages) {
                result.push(q);
            }

            //console.log('wikiUrlsToIds result', result);
            return result;
        })
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