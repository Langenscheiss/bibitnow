var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = { 
		citation_author: [ ['div.product-summary p.author','innerText'] ],
		citation_title: [ ['div.product-details h1.hidden-xs','innerText'] , ['div.product-details h1','innerText'] ],
		citation_isbn: [ ['meta[property="books:isbn" i]','content'] ],
		citation_date: [ ['meta[property="books:release_date" i]','content'] ],
		citation_misc: [ ['div.product-summary p','innerText',true] ],
		citation_abstract: [ ['meta[property="og:description" i]','content',true,20000] , ['div.product-long-description','content',true,20000] ]
	};

	// finally expose selector message
	return { prefselectorMsg: prefselectorMsg };

}());
