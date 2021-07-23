/*  
    Wikipedia API interface
*/

function wikiSearch(searchTerm){
    var result = ['article 1', 'article 2', 'article 3'];
    // call the wiki api here and populate result
    return result;
}

// https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exlimit=1&titles=Pet_door&explaintext=1&formatversion=2
function wikiText(pageTitle){
    var result = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
    // call the wiki api here and populate result
    return result;
}

// https://en.wikipedia.org/w/api.php?action=query&list=recentchanges
function wikiLatestEdits(){
    var result = ['article 1', 'article 2', 'article 3'];
    // call the wiki api here and populate result
    return result;
}