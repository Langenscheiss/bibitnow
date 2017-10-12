var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;

	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = { 
		citation_author: [ ['div.byAuthors','innerText'] , ['div.editedBy','innerText'] ],
		citation_issn: [ ['div.bookNavigatorOffersList span','innerText'] , ['div.bookNavigatorOffersList','innerText'] ],
		citation_date: [ ['div#journalNavPanel p','innerText'] ],
		citation_doi: [ ['input[name="href"]','value'] ]
	};

	// finally expose selector message
	return { prefselectorMsg: prefselectorMsg };

}());
