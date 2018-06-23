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
		if (metaData["citation_download"] != "") {
			return (metaData["citation_url_nopath"] + "/publicliterature.PublicationHeaderDownloadCitation.downloadCitation.html?publicationUid=" + link.replace(/^[\s]*PB:[\s]*/i,"") + "&fileType=RIS&citationAndAbstract=true");
		}
		return "";
	}
	
	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = {
		citation_type: [ ['strong.publication-meta-type','innerText'] ],
		citation_misc: [ ['div.publication-meta-text-book div','innerText',true] ],
		citation_download: [ ['meta[property="rg:id"]','content'] ]
	};

	// finally expose selector message and link formatter
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink };

}());
