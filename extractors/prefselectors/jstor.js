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
		if (metaData["query_summary"]["citation_download"] != 3) {
			return (metaData["citation_url_nopath"] + link.replace(/\/info\//,"/ris/").trim());
		} else {
			return (metaData["citation_url_nopath"] + "/citation/ris/" + link);
		}
	}

	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = {
		citation_publisher: [ ['meta[name="ST.publisher"]','content'] , ['div#metadata-info-tab-contents div.publication-info a.publisher-link','innerText'] , {query: 'div.turn-away-content__article-summary-info div.turn-away-content__summary.row div.columns', attribute: 'innerText' , allowMultipleLines: true , lineSeparator: " |-| "} ],
		citation_journal_title: [ ['div.journal cite','innerText'] ],
		citation_type: [ ['div[data-qa="content-type"]','innerText'] , ['div#book-info-drop','id'] ],
		citation_title: [ ['div.book-title','innerText'] , ['input[name="item_title"]','value'] , ['pharos-heading.title-font','innerText'] ],
		citation_date: [ ['div.published_date','innerText'] , ['div#metadata-info-tab-contents div.publication-info span[data-qa="copyright-date" i]','innerText'] ],
		citation_doi: [ ['input[name="item_doi"]','value'] , ['div#book-info-drop','data-doi'] , ['div#metadata-info-tab-contents div.doi','innerText'] ],
		citation_authors: [ ['div#metadata-info-tab-contents div.contrib span.name','innerText'], ['div.contrib','innerText'] , ['div.author-font','innerText'] ],
		citation_misc: [ ['div.src.mbl','innerText'] , ['div[data-qa="item-src-info" i]','innerText'], ['script[data-analytics-provider="ga"]','textContent',true,20000] ],
		citation_url: [ ['link[rel="canonical"]','href'] ],
		citation_abstract: [ ['div.abstract','innerText',true,20000 ] , ['div#book-info-drop div.book-description','innerText',true,20000] , ['div#metadata_info_tab_contents div.mtl.mbxl','innerText',true,20000] , ['div.turn-away-content__article-information p.summary-paragraph','innerText',true,20000 ]],
		citation_keywords: [ ['div.topics-list.mtl','innerText'] , ['ol[data-qa="topics-list" i] li','innerText']],
		citation_download: [ ['li.cite-this-item-button a','href'] , ['a.button.cite-this-item','href'] , ['div#metadata-info-tab-contents div.cite-this-item-column button[data-qa="cite-this-item" i]','data-cite-button-doi'] , ['a[data-open="citation-tools"]','href'] ],
		citation_issn: [ ['meta[name="ST.printIssn"]','content'] , ['meta[name="ST.onlineIssn"]','content'] ],
		citation_isbn: [ ['div#book-info-drop div.book-eisbn','innerText'] , ['select#QSFSearchFilter option[aria-label="Search In This Book" i]','value'] ],
		citation_firstpage: [ ['div#metadata-info-tab-contents div[data-qa="page-range"]','innerText'] ],
		citation_collection_title: [ ['div#metadata-info-tab-contents h2[data-qa="parent-content-title" i]','innerText'] ]
	};

	// finally expose selector message
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink };

}());
