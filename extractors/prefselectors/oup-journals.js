var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	// this function is called by the background script in order to return a properly formatted citation download link
	function formatCitationLink(metaData, link) {
		return (metaData["citation_url"].replace(/oup\.com\/.*$/,"oup.com") + link.replace(/\?format=.*$/,"?format=ris"));
	}
	
	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = { 
		citation_issn: [ ['meta[name="citation_issn"]','content'] ],
		citation_title: [ ['h1.wi-article-title.article-title-main','innerText'] ],
		citation_download: [ ['div#getCitation ul a','href'] ]
	};

	// finally expose selector message and link formatter
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink };

}());
