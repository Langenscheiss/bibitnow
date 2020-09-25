var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;

	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = { 
		citation_url: [ ['meta[property="og:url"]','content'] ],
		citation_type: [ ['h4[data-bind="text: translations.dissertation"]','data-bind'] , ['h1#publication-title div.small', 'innerText'] ],
		citation_abstract: [ ['meta[name="citation_abstract"]','content', true, 20000] ],
		citation_date: [ ['meta[name="citation_publication_date"]','content'] , ['meta[name="citation_online_date"]','content'] ],
		citation_misc: [ ['meta[name="citation_dissertation_institution"]','content'] ]
	};

	// finally expose selector message
	return { prefselectorMsg: prefselectorMsg };

}());
