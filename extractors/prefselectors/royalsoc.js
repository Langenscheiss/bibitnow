var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;

	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = {
		citation_authors: [ ['meta[name="dc.Creator" i]','content'] , ['div.citation__meta span.hlFld-ContribAuthor','innerText']  ],
		citation_journal_abbrev: [ ['div.citation__meta span.abbrevTitle','innerText'] ],
		citation_volume: [ ['div.citation__meta span.volume','innerText'] ],
		citation_issue: [ ['div.cover-image span.issue','innerText'] ],
		citation_firstpage: [ ['div.citation__meta span.pageRange','innerText'] ],
		citation_misc: [ ['div.article__info','innerText',true] ],
		citation_abstract: [ ['div.abstractSection.abstractInFull','innerText',true,20000] ]
	};

	// this function is called by the background script in order to return a properly formatted citation download link
	function formatCitationLink(metaData, link) {
		return "";
// 		if (link == null || link == "") return "";
// 		return (metaData["citation_url_nopath"] + link);
	}

	// expose selector message and link formatter
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink };

}());
