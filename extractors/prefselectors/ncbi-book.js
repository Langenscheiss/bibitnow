var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;

	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = { 
		citation_issn: [ ['span[itemprop="isbn"]','innerText'] ],
		citation_date: [ ['spin[itemprop="datePublished" i]','innerText'] ],
		citation_abstract: [ ['div[itemprop="description"]','innerText',true,20000] ],
		citation_publisher_address: [ ['div.meta-content div.half_rhythm','innerText'] ]
	};

	// finally expose selector message
	return { prefselectorMsg: prefselectorMsg };

}());
