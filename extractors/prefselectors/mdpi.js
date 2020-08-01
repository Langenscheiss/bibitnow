var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;

	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = { 
		citation_author: [ ['meta[name="citation_authors"]','content'] ],
		citation_abstract: [ ['div.art-abstract.in-tab','innerText', true, 20000] ],
		citation_journal_abbrev: [ ['div.journal-info span a','innerText'] ],
		citation_misc: [ ['div.art-abstract.in-tab span.MJX_Assistive_MathML, div.art-abstract.in-tab span.math','innerText', true, 1024, true, 1000] ],
		citation_date: [ ['meta[name="prism.publicationDate" i]','content'] , ['meta[name="dc.date" i]','content'] ]
	};

	// finally expose selector message
	return { prefselectorMsg: prefselectorMsg };

}());
