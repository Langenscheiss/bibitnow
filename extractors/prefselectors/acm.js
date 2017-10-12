var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	// this function is called by the background script in order to return a properly formatted citation download link
	function formatCitationLink(metaData, link) {
		var returnString = "http://dl.acm.org/exportformats.cfm?id=";
		
		//get id from doi and attach to link
		returnString += metaData["citation_download"].replace(/^[^\/]*\//,"");
		returnString += "&expformat=endnotes";
		return returnString;
	}
	
	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = { 
		citation_author: [ ['meta[name="citation_authors"]','content'] ],
		citation_misc: [ ['meta[name="citation_isbn"]','content'] ],
		citation_journal_title: [ ['meta[name="citation_journal_title"]','content'] ],
		citation_download: [ ['meta[name="citation_doi"]', 'content'] ]
	};

	// finally expose selector message and link formatter
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink };

}());
