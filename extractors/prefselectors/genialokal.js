var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;

	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = {
		citation_author: [ ['h2.manufacturer','innerText'] , ['span.manufacturer','innerText'] ],
		citation_publisher: [ ['td[itemprop="manufacturer"]','innerText'] ],
		citation_issn: [ ['td[itemprop="isbn"]','innerText'] , ['td[itemprop="gtin13"]','innerText'] ],
		citation_abstract: [ ['div.tab-content p','innerText',true, 20000] ],
		citation_misc: [ ['div#Produktdetails td,th','innerText'] ]
	};

	// finally expose selector message
	return { prefselectorMsg: prefselectorMsg };

}());
