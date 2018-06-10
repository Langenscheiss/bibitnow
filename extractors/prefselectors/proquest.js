var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = { 
		citation_authors: [ ['div.citationTextWrapper span.titleAuthorETC a[title*="author"]','innerText'] ],
		citation_journal_title: [ ['div.citationTextWrapper span.titleAuthorETC a[title*="journal"]','innerText'] ],
		citation_issn: [ ['div.citationTextWrapper span.titleAuthorETC span[title="issn"]+span.value','title'] ],
		citation_title: [ ['div.citationTextWrapper h1:first-of-type','innerText'] ],
		citation_volume: [ ['div.citationTextWrapper span.titleAuthorETC a[title*="issue"]','innerText'] ],
		citation_misc: [ ['a#downloadPDFLink','href'] , [ 'div.docViewFullCitation div.display_record_indexing_fieldname,div.docViewFullCitation div.display_record_indexing_data', 'innerText' ] ],
		citation_firstpage: [ ['div.citationTextWrapper span.titleAuthorETC:last-of-type','innerText'] ],
		citation_doi: [ ['div.citationTextWrapper div.abstract_Text','innerText'] , ['div#documentMetricsPanel div[data-template="proquestplatform"]','data-doi' ] ],
		citation_abstract: [ ['div.abstract','innerText',true,20000] ]
	};

	// finally expose selector message
	return { prefselectorMsg: prefselectorMsg };

}());
