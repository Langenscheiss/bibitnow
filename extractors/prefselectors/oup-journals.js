var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	// this function is called by the background script in order to return a properly formatted citation download link
	function formatCitationLink(metaData, link) {
		return (metaData["citation_url_nopath"] + link.replace(/\?format=.*$/,"?format=ris"));
	}
	
	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = { 
		citation_issn: [ ['meta[name="citation_issn"]','content'] , ['div.journal-footer-colophon li','innerText'] ],
		citation_title: [ ['meta[name="citation_title"]','content'], ['h1.wi-article-title.article-title-main','innerText',true] ],
		citation_misc: [ ['section.abstract script[type^="math/tex"], section.abstract div.MathJax_Display','textContent', true, 1024, true, 1000] ],
		citation_abstract: [ ['section.abstract','textContent', true, 20000] ],
		citation_keywords: [ ['meta[name="citation_keyword"]','content'] , ['div.kwd-group a.kwd-part','innerText'] ],
		citation_date: [ ['meta[name="citation_publication_date"]','content'] , ['div.citation-date','innerText'] ],
		citation_download: [ ['div#getCitation ul a','href'] ]
	};

	// finally expose selector message and link formatter
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink };

}());
