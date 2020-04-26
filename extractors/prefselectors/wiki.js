var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	// this function is called by the background script in order to return a properly formatted citation download link
	function formatCitationLink(metaData, link) {
		return "";
	}
	
	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = {
		citation_json: [['script[type="application/ld+json"]','textContent',true,20000]],
		citation_url: [ ['div.printfooter a[dir="ltr" i]','href'] ]
	};

	// finally expose selector message
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink };

}());
