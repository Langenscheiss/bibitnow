var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;

	// this function is called by the background script in order to return a properly formatted citation download link
	function formatCitationLink(metaData, link) {
		link = metaData["citation_doi"];
		if (link == null || link == "") return "";
		return (metaData["citation_url_nopath"] + "/action/downloadCitation?doi=" + link + "&include=abs&format=ris&direct=true");
	}

	//function to obtain fallback url in case a pdf is loaded
  function getFallbackURL(url) {
    return (url.search(/\/doi\/pdf\//i) != -1) ?  url.replace(/\/doi\/pdf\//i,"/doi/") : null;
  }

	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = {
		citation_journal_title: [ ['input[name="journalNameForjhpLink" i]','value'] , ['div#series-logo img','alt'] , ['input[name="quickLinkJournal"]','value']],
		citation_date: [ ['ul.rlist.article-chapter-history-list li:last-child','innerText', true ] ],
		citation_misc: [ {query: 'div.article_header-cite-this span', attribute: 'innerText' , allowMultipleLines: true , lineSeparator: ","} ],
		citation_authors: [ ['meta[name="dc.Creator" i]','content',true] ],
		citation_issn: [ ['a#rightsAndPermissions','href'] ],
		citation_abstract: [ ['p.articleBody_abstractText','innerText', true, 20000] ],
		citation_download: [ ['input[name="journalNameForjhpLink" i]','value'] ]
	};

	// finally expose selector message and link formatter
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink , getFallbackURL: getFallbackURL};

}());
