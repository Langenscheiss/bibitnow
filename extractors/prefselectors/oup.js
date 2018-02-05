var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;

	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = { 
		citation_misc: [ ['div.content_right.product_sidebar p:not(:empty):nth-of-type(2)','innerText'] , ['div.content_right.product_sidebar p:not(:empty):nth-of-type(3)','innerText'] , ['div.content_right.product_sidebar p:not(:empty):nth-of-type(4)','innerText'] , ['div.content_right.product_sidebar p:not(:empty):nth-of-type(5)','innerText'] , ['div.content_right.product_sidebar p:not(:empty):nth-of-type(6)','innerText'] ],
		citation_issn: [ ['div.content_right.product_sidebar > p:nth-last-of-type(2)','innerText'] ],
		citation_url: [ ['meta[property="og:url"]','content'] ],
		citation_abstract: [ ['div.expanding_content_container_inner_narrow','innerText', true, 20000] ]
	};

	// finally expose selector message
	return { prefselectorMsg: prefselectorMsg };

}());
