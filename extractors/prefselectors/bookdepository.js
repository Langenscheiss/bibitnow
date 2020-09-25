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
		citation_authors: [ ['div.item-info div.author-info span[itemprop="author" i]','innerText'] ],
		citation_title: [ ['h1[itemprop="name" i]','innerText'] ],
		citation_abstract: [['div[itemprop="description" i]','innerText',true,20000]],
		citation_misc: [ {query: 'div.biblio-wrap ul.biblio-info', attribute: 'innerText', allowMultipleLines: true, lineSeparator: " |-| "} ]
	};

	// finally expose selector message
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink };

}());
