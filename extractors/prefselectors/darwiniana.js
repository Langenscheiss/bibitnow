var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;

	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = { 
		citation_title: [ ['div.tituloArt','innerText',true] ],
		citation_author: [ ['meta[name="citation_authors"]','content'], ['div.tituloArt + div + div.content_item > :not(sup)','innerText'] ],
		citation_abstract: [ ['div#articleAbstract p','innerText', true, 20000] , ['div#articleAbstract div','innerText', true, 20000] ]
	};

	// finally expose selector message
	return { prefselectorMsg: prefselectorMsg };

}());
