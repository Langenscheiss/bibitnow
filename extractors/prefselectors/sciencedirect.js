var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;

	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = { 
		citation_misc: [ ['p.volIssue,div.publication-volume > div','innerText'] ],
		citation_journal_title: [ ['div.title a.cLink,div.publication-volume a.publication-title-link','innerText'] ],
		citation_author: [ ['a.authorName,div.AuthorGroup span.author-name','innerText'] , ['div.author-group span.content span.text','innerText'] ],
		citation_title: [ ['h1.article-title','innerText'] ],
		citation_doi: [ ['div.DoiLink a.doi','href'] ],
		citation_issn: [ ['div.title a.cLink,div.publication-volume a.publication-title-link','href'] ]
	};

	// finally expose selector message
	return { prefselectorMsg: prefselectorMsg };

}());
