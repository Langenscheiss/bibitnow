var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;

	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = { 
		citation_author: [ ['div.views-field-field-contributor','innerText'] , ['div.o-book__meta ul.o-book__authors li','innerText'] ],
		citation_date: [ ['div.field.field--name-field-year-copyright','innerText'] , ['div.view-footer','innerText',true] ],
		citation_publisher: [ ['meta[property="og:site_name"]','content'] ],
		citation_abstract: [ ['div#overview','innerText',true,20000] , ['div.view-id-work_body span.field-content','innerText',true,20000] ]
	};

	// finally expose selector message
	return { prefselectorMsg: prefselectorMsg };

}());
