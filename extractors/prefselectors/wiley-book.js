var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;

	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = { 
		citation_author: [ ['div#metaData p:first-of-type','innerText'] ],
		citation_title: [ ['h1#productTitle','innerText'] ],
		citation_doi: [ ['span.doi','innerText'] ],
		citation_issn: [ ['span.printIsbn','innerText'] , ['span.onlineIsbn','innerText'] ],
		citation_date: [ ['span.onlinePublicationDate','innerText'] ],
		citation_publisher: [ ['p.copyright','innerText'] ]
	};

	// finally expose selector message
	return { prefselectorMsg: prefselectorMsg };

}());
