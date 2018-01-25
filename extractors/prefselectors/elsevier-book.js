var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;

	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = { 
		citation_author: [ ['span[itemprop="Author"]','innerText'] , ['span[itemprop="Editor"]','innerText'] ],
		citation_title: [ ['header.book-intro-header','innerText'] ],
		citation_abstract: [ ['section#description div[itemprop="description"]','innerText',true, 20000] ],
		citation_issn: [ ['dd[itemprop="isbn"].print.isbn','innerText'] , ['dd[itemprop="isbn"]','innerText'] ],
		citation_date: [ ['dd[itemprop="datePublished"]','innerText'] , ['meta[name="published date"]','content'] ],
		citation_publisher: [ ['dd[itemprop="publisher"]','innerText'] ]
	};

	// finally expose selector message
	return { prefselectorMsg: prefselectorMsg };

}());
