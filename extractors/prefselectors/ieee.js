var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	// this function is called by the background script in order to return a properly formatted citation download link
	function formatCitationLink(metaData, link) {
		
		//return immediately if link
		if (link == null) return "";
		
		//get ids, return if not valid
		const ids = link.replace(/(?:^.*\.org\/document\/|\/.*$)/g,"").replace(/[^0-9]/g,"");
		
		if (ids == "") return "";
		
		//set download method to POST
		metaData["citation_download_method"] = "POST";
		
		//return download link with ids obtained from abstract page url
		return (link.replace(/\.org\/.*$/,".org/xpl/downloadCitations?") + "citations-format=citation-only&download-format=download-ris&recordIds=" + ids);
	}
	
	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = { 
		//static meta information unfortunately not available on this stupid page
		citation_download: [ ['BINURL','href'] ]
	};

	// finally expose selector message
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink };

}());
