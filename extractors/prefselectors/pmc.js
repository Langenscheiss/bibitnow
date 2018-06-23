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
		return (metaData["citation_url_nopath"] + "/pmc/utils/ctxp/?ids=" + link + "&report=ris&format=ris");
	}
	
	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = { 
		citation_journal_abbrev: [ ['div.navlink-box li.archive a.navlink','textContent'] ],
		citation_keywords: [ ['div#maincontent span.kwd-text','innerText'] ],
		citation_abstract: [ ['meta[property="og:description"]','content', true, 20000] ],
		citation_download: [ ['div.navlink-box li.accid','textContent'] ]
	};

	// finally expose selector message and link formatter
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink };

}());
