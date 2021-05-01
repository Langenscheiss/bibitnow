var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;

	// this function is called by the background script in order to return a properly formatted citation download link
	function formatCitationLink(metaData, link) {

		// return if invalid link
		if (link == null || link == "") return "";

		//get base url and modify
		link = metaData["citation_url_nopath"] + link;
		return link.replace(/showCitFormats/,"downloadCitation") + "&include=all";
	}

	function getFallbackURL(url) {
    return (url.search(/\/doi\/pdf\//i) != -1) ?  url.replace(/\/doi\/pdf\//i,"/doi/abs/") : null;
  }

	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = {
		citation_doi: [ ['a#crossMark','data-doi'] ],
		citation_issn: [ ['a[title="Rights Link"]','href'] ],
		citation_abstract: [ ['div.abstractSection.abstractInFull','innerText', true, 20000] , ['div.hlFld-Abstract','innerText',true,20000] ],
		citation_keywords: [ ['meta[name=\"keywords\"]','content'] , ['ul.list.topic-list.padded-content.aipthesaurus a','innerText'] ],
		citation_download: [ ['li[tabindex="-1"] a', 'href'] , ['ul.tools-sub-menu a','href'] ]
	};

	// finally expose selector message and link formatter
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink , getFallbackURL: getFallbackURL };

}());
