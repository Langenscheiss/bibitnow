var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = { 
		citation_author: [ ['div#metaData p:first-of-type','innerText'] , ['div.info-block.book-header li','textContent',true ] , ['div.info-block.book-header','textContent',true ] ],
		citation_title: [ ['h1#productTitle','innerText'] , ['div.journal-info-container h1 span.title','innerText'] ],
		citation_doi: [ ['span.doi','innerText'] ],
		citation_misc: [ ['div.info-block','innerText',true ] ],
		citation_issn: [ ['span.printIsbn','innerText'] , ['span.onlineIsbn','innerText'] ],
		citation_date: [ ['span.onlinePublicationDate','innerText'] ],
		citation_abstract: [ ['div#bookHome div#homepageContent','innerText',true,20000] , ['div.content.aboutBook','innerText',true,20000] ],
		citation_publisher: [ ['p.copyright','innerText'] ]
	};

	// finally expose selector message
	return { prefselectorMsg: prefselectorMsg };

}());
