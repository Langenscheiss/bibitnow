var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;

	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = {
		citation_issn: [ ['meta[name="citation_isbn"]','content'] ],
		citation_title: [ ['div.page-head__book-text h1','innerText'] ],
		citation_authors: [ ['span.page-head__book-authors','innerText'] ],
		citation_abstract: [ ['article[aria-label="Article abstract"] div.capsule__text','innerText', true, 20000] ]
	};
	
	// this function is called by the background script in order to return a properly formatted citation download link
	function formatCitationLink(metaData, link) {
		return "";
	}
	
	// expose selector message and link formatter
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink };

}());
