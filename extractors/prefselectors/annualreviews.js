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

		link = metaData["citation_url_nopath"] + link;
		return link.replace(/showCitFormats/,"downloadCitation");
	}

	function getFallbackURL(url) {
    return (url.search(/\/doi\/pdf\//i) != -1) ?  url.replace(/\/doi\/pdf\//i,"/doi/abs/") : null;
  }

	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = {
		citation_journal_title: [ ['div.article-details div.journal-issue','innerText'] ],
		citation_misc: [ ['div.article-details div+p','innerText'] ],
		citation_issue: [ ['input[name="quickLinkIssue"]','value'] ],
		citation_issn: [ ['ul.article-util-links a','href'] ],
		citation_doi: [ ['div.article-details p a','href'] ],
		citation_abstract: [ ['div.abstractSection.abstractInFull p','innerText', true, 20000] ],
		citation_download: [ ['a#export-article-link','href'], ['li.downloadCitations a','href'] ]
	};

	// finally expose selector message
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink , getFallbackURL: getFallbackURL };

}());
