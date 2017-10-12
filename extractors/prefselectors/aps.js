var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	// this function is called by the background script in order to return a properly formatted citation download link
	function formatCitationLink(metaData, link) {
		var returnString = metaData["citation_download"]; 
		//if download link found, use it. Otherwise, make an educated guess for aps
		if (metaData["query_summary"][16] == -1) {
			returnString = 'https://journals.aps.org' + returnString;
			returnString += '?type=ris&download=false';
		} else if (metaData["query_summary"][16] == -2) {
			returnString = metaData["citation_url"].match(/(^http[s]?:\/\/[^\/]*\/[^\/]*\/)[^\/]*(.*$)/);
			if (returnString != null && returnString.length > 2) returnString = "" + returnString[1] + 'export' + returnString[2] +  '?type=ris&download=false';
		}
		return returnString;
	}
	
	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = { 
		citation_issn: [ ['p.legal','innerText'] ],
		citation_download: [ ['a#export-article-link','href'] , ['BINURL','']]
	};

	// finally expose selector message and link formatter
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink };

}());
