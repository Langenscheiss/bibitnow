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
		return (metaData["citation_url"].replace(/tandfonline\.com\/.*$/,"tandfonline.com") + link.replace(/showCitFormats\?/,"downloadCitation?") + "&include=abs");
	}
	
	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = { 
		citation_journal_title: [ ['div.title-container h1 a','innerText'] ],
		citation_title: [ ['meta[property="og:title"]','content'] , ['div.widget.literatumPublicationHeader span.NLM_article-title','innerText'] ],
		citation_author: [ ['div.publicationContentAuthors a.entryAuthor','innerText'] ],
		citation_misc: [ ['div.title-container h2','innerText'] , ['span.contentItemPageRange','innerText'] ],
		citation_date: [ ['div.widget.literatumContentItemHistory div.wrapped div.widget-body div:last-of-type','innerText'] , ['div.widget.literatumContentItemHistory div.wrapped div.widget-body','innerText'] , ['meta[name="dc.Date"]','content'] ],
		citation_doi: [ ['div.altmetric-embed','data-doi'] ],
		citation_abstract: [ ['div.abstractSection.abstractInFull','innerText',true,20000] ],
		citation_download: [ ['li.downloadCitations a','href'] ]
	};

	// finally expose selector message and link formatter
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink };

}());
