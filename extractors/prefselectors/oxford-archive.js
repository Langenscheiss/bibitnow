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
		return (metaData["citation_url_nopath"] + link);
	}
	
	
	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = {
		citation_author: [ ['div.blacklight-authors > span > div','innerText',false] , ['meta[name="citation_author"]','content'] , ['div.author div.aname a.closed','innerText'] , ['meta[name="DC.creator"]','content'] ],
		citation_type: [ ['p.details-page-type_of_work','innerText'] ],
		citation_journal_title: [ ['dd.blacklight-journal','innerText'] ],
		citation_issue: [ ['dd.blacklight-issue','innerText'] ],
		citation_volume: [ ['dd.blacklight-volume','innerText'] ],
		citation_doi: [ ['dd.blacklight-identifiers__doi','innerText'] ],
		citation_abstract: [ ['div.abstract_block','innerText', true, 20000] , ['dd.abstract-block script','textContent',true,20000] ],
		citation_publisher: [ ['div#mpeople','textContent',true] , ['div#infodiv table.infoL.award','innerText',true ] , ['dd.blacklight-degree_institution','innerText'] ],
		citation_download: [ ['div#metadata a#json','href'] , ['a#export_refworks','href'] ],
		citation_issn: [ ['meta[name="citation_isbn"]','content'] ]
	};

	// finally expose selector message and link formatter
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink };

}());
