var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;

	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = { 
		citation_title: [ ['div.title-container h1','innerText'] ],
		citation_abstract: [ ['div#book-description','innerText', true, 20000] ],
		citation_authors: [ ['div.simple-authors div.author-detail h3','innerText'] , ['div.cover-panel div.author-list p:nth-of-type(2)','innerText'] ],
		citation_misc: [ ['div.kf-detail-item','innerText',true] ]
	};

	// finally expose selector message
	return { prefselectorMsg: prefselectorMsg };

}());
