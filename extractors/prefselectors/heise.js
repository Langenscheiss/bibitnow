/* This is a minimal working example of a "preferred selector" script. Returns an empty download link for dynamic citation (=> no export request sent!), and selects a meta tag for citation author query.*/
var BINPrefselector = ( function () {

	/*shadows for global variables from background context */
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	// this function is called by the background script in order to obtain a properly formatted citation download link. "metaData" provides access to all static data obtained by the extractor. "link" is the download link obtained by the extractor. Returns the formatted download link as a string! 
	function formatCitationLink(metaData, link) {
		return "";
	}
	
	// this json object defines search queries through css selectors
	var prefselectorMsg = { 
		citation_authors: [ ['meta[name="author"]','content'] ],
		citation_publisher: [ ['meta[name="publisher"]','content'] ],
		citation_date: [ ['meta[name="date"]','content'] ],
		citation_abstract: [ ['meta[name="description"]','content',true,20000] ]
	};

	// finally expose selector message
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink };

}());