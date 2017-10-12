var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;

	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = { 
		citation_misc: [ ['div#articleToolsNav div.groupInfo','innerText'] ],
		citation_journal_abbrev: [ ['div.articleMeta i','innerText'] ],
		citation_firstpage: [ ['meta[property="og:description"]','content'] ],
		citation_issn: [ ['div#smallIssueCover + div','innerText'] ]
	};

	// finally expose selector message
	return { prefselectorMsg: prefselectorMsg };

}());
