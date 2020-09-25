var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;

	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = { 
		citation_author: [ ['div#bookAuthors span[itemprop="name"]','innerText'] ],
		citation_title: [ ['meta[property="og:title"]','content'] , ['h1#bookTitle','innerText'] ],
		citation_misc: [ ['div#details div.row','innerText'] ],
		citation_abstract: [ ['div#description span[style="display:none"]','textContent', true, 20000] , ['div#description span','innerText',true, 20000] ],
		citation_issn: [ ['div#bookDataBox span[itemprop="isbn"]','innerText'] ]
	};

	// finally expose selector message
	return { prefselectorMsg: prefselectorMsg };

}());
