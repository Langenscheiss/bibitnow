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
		return (metaData["citation_url"].replace(/pnas\.org\/.*$/,"pnas.org") + link.replace(/citmgr\?/,"citmgr?type=mendeley&"));
	}
	
	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = { 
		citation_publisher: [ ['meta[name="DC.Publisher"]','content'] ],
		citation_download: [ ['div#cb-art-mgr li a','href'] ],
		citation_abstract: [ ['div.section.abstract','innerText',true,20000] ],
		citation_keywords: [ ['ul.kwd-group li.kwd','innerText'] ]
	};

	// finally expose selector message and link formatter
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink };

}());
