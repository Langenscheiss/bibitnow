var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	// this function is called by the background script in order to return a properly formatted citation download link
	function formatCitationLink(metaData, link) {
		link = metaData["citation_url"];
		return (link.replace(/\.org\/.*$/,"") + ".org/action/downloadCitation?doi=" + link.replace(/^.*\/abs\//,"").trim().replace(/\//,"%2F")+"&include=abs");
	}
	
	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = { 
		citation_journal_title: [ ['h1.pageTitleNoRule','innerText'] ],
		citation_misc: [ ['p.articleRef','innerText'] ],
		citation_issn: [ ['div#articleInfoBox p','innerText'] ],
		citation_abstract: [ ['div.abstractSection','innerText', true, 20000] ],
		citation_download: [ ['meta[property="og:url"]','content'] ]
	};

	// finally expose selector message and link formatter
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink };

}());
