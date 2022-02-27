var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;

	// this function is called by the background script in order to return a properly formatted citation download link
	function formatCitationLink(metaData, link) {
		//return if no valid link
		if (link == null || link == "") return "";
		return (metaData["citation_url_nopath"] + link);

	}

	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = {
		citation_abstract: [ ['div#abstract-1','innerText', true, 20000] , ['meta[name="citation_abstract"]','content', true, 20000] , ['meta[name="DC.Description" i]','content', true, 20000] ],
		citation_download: [ ['div#getCitation ul li a','href'] , ['div.highwire-citation-formats-links li.ris a','href'] ],
		citation_authors: [ ["meta[name=\"citation_author\" i]","content"] , ["span.cit-auth-list span.cit-auth","innerText",true] ],
    citation_issn: [ ['div.journal-footer-colophon','innerText',true] ]
	};

	// finally expose selector message and link formatter
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink };

}());
