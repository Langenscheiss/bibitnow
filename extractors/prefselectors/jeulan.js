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
		return (metaData["citation_url_nopath"] + link.replace(/^.*\.eu\//,"/") + "download/ris/");
	}
	
	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = { 
		citation_download: [ ['meta[property="og:url" i]','content'] ],
		citation_url: [ ['meta[property="og:url" i]','content'] ],
		citation_firstpage: [ ['meta[name="eprints.pagerange" i]','content'] ],
		citation_abstract: [ ['meta[name="description" i]','content',true,20000] ],
		citation_keywords: [ ['h1#keywords ~ div','innerText'] ]
	};

	// finally expose selector message and link formatter
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink };

}());
