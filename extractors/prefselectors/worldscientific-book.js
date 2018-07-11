var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;

	// this function is called by the background script in order to return a properly formatted citation download link
	function formatCitationLink(metaData, link) {
		let doi = BINResources.cleanDOI(metaData["citation_doi"]);
		if (doi == "") return "";
		return (metaData["citation_url_nopath"] + "/action/downloadCitation?doi=" + doi + "&include=abs");
	}
	
	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = { 
		citation_author: [ ['div.byAuthors','innerText'] , ['div.editedBy','innerText'] , ['span.hlFld-ContribAuthor a','innerText'] ],
		citation_issn: [ ['div.bookNavigatorOffersList span','innerText'] , ['div.bookNavigatorOffersList','innerText'] , ['div.purchase-options-container span.add-article-to-cart__title.title','innerText'] ],
		citation_download: [ ['div.articleMeta i','innerText'] , ['BINURL',''] ],
		citation_date: [ ['div#journalNavPanel p','innerText'] , ['span.cover-date','innerText'] ],
		citation_abstract: [ ['div#aboutBook p','innerText',true,20000] , ['li#aboutBook','innerText',true,20000] ],
		citation_doi: [ ['input[name="href"]','value'] , ['span.doi a','href'] ]
	};

	// finally expose selector message
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink };

}());
