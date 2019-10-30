var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	// this function is called by the background script in order to return a properly formatted citation download link
	function formatCitationLink(metaData, link) {
		//dynamic citation is not worth it for this publisher
		return "";
	}
	
	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = { 
		citation_misc: [ ['div#leftBox p.leftElement','textContent'] ],
		citation_abstract: [ ['meta[name="description"]','content',true,20000] ],
		citation_type: [ ['span.pubtypes','innerText'] ],
		citation_date: [ ['meta[name="citation_date"]','content'],['div.recordlastmodifiedbox','innerText'] ],
		citation_authors: [ ['p.leftElement span.refauthor span[itemprop="author"] span[itemprop="name"],p.leftElement a.refauthor span[itemprop="name"]','innerText'] ]
	
	};

	// finally expose selector message
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink };

}());
