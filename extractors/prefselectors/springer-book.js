var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;

	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = { 
		citation_publisher: [ ['dd[itemprop="publisher"] span[itemprop="name"]','innerText'] ],
		citation_publisher_address: [ {query: 'div.product-bibliographic',attribute: 'innerText', allowMultipleLines: true, lineSeparator: " |-| "} ],
		citation_title: [ ['div[data-test="book-title" i]','innerText'] , ['div.product-bibliographic dd[itemprop="name" i]','innerText'] ],
		citation_author: [ ['li[itemprop="author"] span[itemprop="name"]','innerText'] , ['li[itemprop="editor"] span[itemprop="name"]','innerText'] ],
		citation_date: [ ['div.copyright','innerText'] ],
		citation_issn: [ ['dd[itemprop="isbn"]','innerText'] ],
		citation_misc: [ ['div.actions input[name="isbn"]','value'] ],
		citation_abstract: [ ['div.product-about div.springer-html','innerText',true,20000] ],
		citation_keywords: [ ['div.product-bibliographic a[itemprop="genre"]','innerText'] ],
		citation_doi: [ ['input[name="doi"]','value'] ]
	};

	// finally expose selector message
	return { prefselectorMsg: prefselectorMsg };

}());
