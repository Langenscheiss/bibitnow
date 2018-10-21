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
		return (metaData["citation_url_nopath"] + link.replace(/\/info\//,"/ris/").trim());
	}
	
	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = { 
		citation_publisher: [ ['meta[name="ST.publisher"]','content'] ],
		citation_journal_title: [ ['div.journal cite','innerText'] ],
		citation_type: [ ['div[data-qa="content-type"]','innerText'] , ['div#book-info-drop','id'] ],
		citation_title: [ ['div.book-title','innerText'] , ['input[name="item_title"]','value'] ],
		citation_date: [ ['div.published_date','innerText'] ],
		citation_doi: [ ['input[name="item_doi"]','value'] , ['div#book-info-drop','data-doi'] ],
		citation_authors: [ ['div.contrib','innerText'] ],
		citation_misc: [ ['div.src.mbl','innerText'] , ['div[data-qa="item-src-info" i]','innerText']],
		citation_url: [ ['link[rel="canonical"]','href'] ],
		citation_abstract: [ ['div.abstract','innerText',true,20000 ] , ['div#book-info-drop div.book-description','innerText',true,20000] , ['div#metadata_info_tab_contents div.mtl.mbxl','innerText',true,20000]],
		citation_keywords: [ ['div.topics-list.mtl','innerText'] , ['ol[data-qa="topics-list" i] li','innerText']],
		citation_download: [ ['li.cite-this-item-button a','href'] , ['a.button.cite-this-item','href']],
		citation_issn: [ ['meta[name="ST.printIssn"]','content'] , ['meta[name="ST.onlineIssn"]','content'] ],
		citation_isbn: [ ['div#book-info-drop div.book-eisbn','innerText'] ]
	};

	// finally expose selector message
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink };

}());
