var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	// this function is called by the background script in order to return a properly formatted citation download link
	function formatCitationLink(metaData, link) {
		let doi = metaData["citation_doi"];
		if (doi == "") return "";
		return (metaData["citation_url_nopath"] + "/action/downloadCitation?doi=" + doi + "&include=abs");
	}
	
	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = { 
		citation_misc: [ ['div.abstractSection span.math, div.abstractSection span.MJX_Assistive_MathML','innerText',true, 1024, true, 1000]],
		citation_journal_abbrev: [ ['div.articleMeta i','innerText'] ],
		citation_firstpage: [ ['meta[property="og:description"]','content'] , ['div.citation span.article__breadcrumbs','innerText']  ],
		citation_download: [ ['div.articleMeta i','innerText'] , ['BINURL',''] ],
		citation_abstract: [ ['div.abstractSection','innerText',true,20000] ],
		citation_volume: [ ['div.cover-meta-wrap div.meta','innerText'] ],
		citation_issn: [ ['div#smallIssueCover + div','innerText'] ],
		citation_title: [ ['div.citation h1.citation__title','innerText'] ]
	};

	// finally expose selector message
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink };

}());
