var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	// this function is called by the background script in order to return a properly formatted citation download link
	function formatCitationLink(metaData, link) {
		if (link == null && link == "") return "";
		if (metaData["query_summary"]["citation_download"] == 2) {
			link = link.match(/pii\/[^\/]+$/);
			if (link != null) {
				link = link[0].replace(/^pii\//,"");
			} else {
				return "";
			}
		}
		return (metaData["citation_url_nopath"] + "/sdfe/arp/cite?pii=" + link + "&format=application/x-research-info-systems&withabstract=true");
	}
	
	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = { 
		citation_misc: [ ['p.volIssue,div.publication-volume > div','innerText'] ],
		citation_journal_title: [ ['div.title a.cLink,div.publication-volume a.publication-title-link','innerText'] , ['div.title a.cLink img','alt'] ],
		citation_author: [ ['a.authorName,div.AuthorGroup span.author-name','innerText'] , ['div.author-group span.content,div.author-group span.content span.text.given-name,div.author-group span.content span.text.surname,div.author-group span.content span.text.suffix','innerText'] ],
		citation_title: [ ['h1.article-title','innerText'] ],
		citation_doi: [ ['div.DoiLink a.doi','href'] ],
		citation_abstract: [ ['div.Abstracts','innerText',true, 20000] , ['div.abstract.svAbstract ~ div.abstract.svAbstract','innerText', true, 20000] , ['div.abstract.svAbstract','innerText',true, 20000] ],
		citation_keywords: [ ['div.Keywords div.keyword','innerText'] , ['div#centerInner ul.keyword li.svKeywords','innerText'] ],
		citation_download: [ ['meta[name="citation_pii"]','content'] , ['BINURL','href'] ],
		citation_issn: [ ['div.title a.cLink,div.publication-volume a.publication-title-link','href'] ]
	};

	// finally expose selector message and link formatter
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink };

}());
