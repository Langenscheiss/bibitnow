var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;

	// this function is called by the background script in order to return a properly formatted citation download link
	function formatCitationLink(metaData, link) {
		//there is some issue with ssl here -> return empty string
    if (link == null || (link = link.replace(/^.*hindawi.com/,"")) == "") return "";
    return (metaData["citation_url_nopath"] + link);
	}

	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = {
		citation_abstract: [ ['meta[name="citation_abstract"]','content',true,20000] ],
		citation_date: [ ['meta[name="dcterms.issued"]','content'] , ['meta[name="dc.date"]','content'] ],
		citation_download: [ ['a#toolbar__dcNavLarge','href'] ]
	};

	// finally expose selector message and link formatter
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink };

}());
