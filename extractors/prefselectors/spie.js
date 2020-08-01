var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	// this function is called by the background script in order to return a properly formatted citation download link
	function formatCitationLink(metaData, link) {
		
		//return if link invalid
// 		if (link == null || link == "") return "";
		
// 		//return link with correct base url
// 		return (metaData["citation_url_nopath"] + link);
		
		return "";
	}
	
	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = { 
		citation_journal_title: [ ['meta[name="citation_journal_title"]','content'] , ['meta[name="citation_inbook_title"]','content'] ],
		citation_date: [ ['text.DetailDate','innerText'] ],
		citation_abstract: [ ['meta[name="citation_abstract"]','content', true, 20000] , ['text.ArticleContentText','innerText', true, 20000] ],
		citation_misc: [ { query: 'div.ProceedingsArticleOpenAccessPanel',attribute: 'innerText', allowMultipleLines: true, lineSeparator: " |-| "} ],
		citation_type: [ ['div#eBookTOC','id'] ]
	};

	// finally expose selector message and link formatter
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink };

}());
