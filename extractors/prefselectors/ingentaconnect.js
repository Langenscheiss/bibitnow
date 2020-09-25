var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;

	// this function is called by the background script in order to return a properly formatted citation download link
	function formatCitationLink(metaData, link) {
		
		//almost nothing to do
		if (metaData["citation_url"] == "" || link == null || link == "") return "";
		return metaData["citation_url_nopath"] + link.replace(/:\/\/api\./,"://www.");
	}
	
	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = {
		citation_misc: [ ['div#infoArticle div:nth-child(3)','innerText'] , ['div#altLayoutPublisherLogo p, div.greybg>div:nth-of-type(1) p:nth-of-type(1)','innerText', true] ],
		citation_issn: [ ['meta[name="DCTERMS.isPartOf"]','content'] ],
		citation_abstract: [ ['div#Abst','innerText', true, 20000] ],
		citation_download: [ ['a[title="EndNote Export"]','href'] , ['a[title="Export reference in EndNote (RIS format)"]','href'] ]
	};

	// finally expose selector message and link formatter
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink };

}());
