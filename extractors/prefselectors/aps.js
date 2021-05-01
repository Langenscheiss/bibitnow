var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;

	// this function is called by the background script in order to return a properly formatted citation download link
	function formatCitationLink(metaData, link) {
		let returnString = metaData["citation_download"];
		//if download link found, use it. Otherwise, make an educated guess for aps
		if (metaData["query_summary"]["citation_download"] == 1) {
			returnString = metaData["citation_url_nopath"] + returnString + '?type=ris&download=false';
		} else if (metaData["query_summary"]["citation_download"] == 2) {
			returnString = metaData["citation_url"].match(/(^http[s]?:\/\/[^\/]*\/[^\/]*\/)[^\/]*(.*$)/);
			if (returnString != null && returnString.length > 2) {
				returnString = "" + returnString[1] + 'export' + returnString[2] +  '?type=ris&download=false';
			} else {
				returnString = "";
			}
		}
		return returnString;
	}

	//function to obtain fallback url in case a pdf is loaded
  function getFallbackURL(url) {
    return (url.search(/\/pdf\//i) != -1) ?  url.replace(/\/pdf\//i,"/abstract/") : null;
  }

	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = {
		citation_issn: [ ['p.legal','innerText'] ],
		citation_download: [ ['a#export-article-link','href'] , ['BINURL','']],
		citation_abstract: [ ['div#article-content section.abstract div.content p','innerText', true, 20000] , ['meta[name="description"]','content', true, 20000] ],
		citation_author: [ ['meta[name="citation_author"]','content'] , ['div#title h5.authors','innerText'] ],
		citation_keywords: [ ['div.physh-tagging a.physh-concept','innerText'] ],
		citation_misc: [ ['ul.inline-list.labels span.suggestion.label.radius','innerText'] ],
		citation_date: [ ['h5.pub-info','innerText'] ]
	};

	// finally expose selector message and link formatter
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink , getFallbackURL: getFallbackURL };

}());
