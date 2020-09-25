var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;

	// this function is called by the background script in order to return a properly formatted citation download link
	function formatCitationLink(metaData, link) {
		
		//return if invalid link
		if (link == null || link == "") return "";
		
		//get base url and modify
		link = metaData["citation_url"].replace(/\/doi.*$/,"") + link;
		return link.replace(/showCitFormats/,"downloadCitation") + "&format=ris&include=abs";
	}
	
	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = {
		citation_download: [ ['td.export-citation a','href'] ],
		citation_authors: [ ['meta[name="dc.Creator" i]','content'], ['div.publicationContentAuthors span.contribDegrees','innerText'] ],
		citation_doi: [ ['div.publicationContentDoi a','href'] ],
		citation_abstract: [ ['div.abstractSection.abstractInFull','innerText', true, 20000] ],
		citation_misc: [ ['li.rightsLink a.rightslink','href',true,20000] , ['a.articleWorksPurchase','href'] ]
	};

	// finally expose selector message
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink };

}());
