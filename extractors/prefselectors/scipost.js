var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;

	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = {
		citation_abstract: [ ['p.abstract','innerText', true, 20000] ],
		citation_misc: [ { query: 'div#rismodal code span', attribute: 'innerText', allowMultipleLines: true } ]
	};

	// this function is called by the background script in order to return a properly formatted citation download link
	function formatCitationLink(metaData, link) {
		//
		return;
	}

	function getFallbackURL(url) {
    return (url.search(/\/pdf$/i) != -1) ?  url.replace(/\/pdf$/i,"") : null;
  }

	// expose selector message and link formatter
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink , getFallbackURL: getFallbackURL };

}());
