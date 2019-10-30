var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	function formatCitationLink(metaData, link) {
		if (link == null || link == "") return "";
		return "https:" + link;
	}
	
	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = { 
		citation_date: [ ['meta[name="citation_cover_date"]','content'] ],
		citation_title: [ ['div[data-test="book-title" i]','innerText'] ],
		citation_abstract: [ ['section.Abstract','textContent',true,20000] ],
		citation_misc: [ ['section.Abstract span.math, section.Abstract span.MJX_Assistive_MathML, section.Abstract script[type="math/tex"]','textContent', false, 1024, true, 1000] ],
		citation_keywords: [ ['div.KeywordGroup span.Keyword','innerText'] ],
		citation_download: [ ['ul.citations__content a[data-track-label="RIS" i]','href'] , ['div.citations a[data-gtmlabel="RIS"]','href'] ]
	};

	// finally expose selector message and link formatter
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink };

}());