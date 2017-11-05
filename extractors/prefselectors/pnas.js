var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	// this function is called by the background script in order to return a properly formatted citation download link
	function formatCitationLink(metaData, link) {
		var returnString  = metaData["citation_url"].match(/(^http[s]?:\/\/[^\/]*)\/.*$/);
		if (returnString != null && returnString.length > 1) {
			returnString = "" + returnString[1] + link.replace(/citmgr\?/,"citmgr?type=mendeley&");
		} else {
			returnString = "";
		}
		return returnString;
	}
	
	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = { 
		citation_publisher: [ ['meta[name="DC.Publisher"]','content'] ],
		citation_download: [ ['div#cb-art-mgr li a','href'] ]
	};

	// finally expose selector message and link formatter
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink };

}());
