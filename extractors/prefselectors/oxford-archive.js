var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	// this function is called by the background script in order to return a properly formatted citation download link
	function formatCitationLink(metaData, link) {
		if (link == null || link == "") return "";
		return (metaData["citation_url_nopath"] + link);
	}
	
	
	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = {
		citation_author: [ ['meta[name="citation_author"]','content'] , ['div.author div.aname a.closed','innerText'] , ['meta[name="DC.creator"]','content'] ],
		citation_abstract: [ ['div.abstract_block','innerText', true, 20000] ],
		citation_publisher: [ ['div#mpeople','textContent',true] , ['div#infodiv table.infoL.award','innerText',true ] ],
		citation_download: [ ['div#metadata a#json','href'] ],
		citation_issn: [ ['meta[name="citation_isbn"]','content'] ]
	};

	// finally expose selector message and link formatter
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink };

}());
