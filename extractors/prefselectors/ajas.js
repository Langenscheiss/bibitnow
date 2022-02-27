var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;

	// this function is called by the background script in order to return a properly formatted citation download link
	function formatCitationLink(metaData, link) {

		//get base url and modify
		if (metaData["citation_url"] == "") return "";
		link = link.replace(/^.*number=/gi,"");
		if (link == null || link == "") return "";
    metaData["citation_download_method"] = "POST";
    metaData["citation_download_content_type"] = "application/x-www-form-urlencoded";
    link = "mode=download&number=" + link + "&file_format=ris&ab_include=abs";
    metaData["citation_download_requestbody"] = link;
		return (metaData["citation_url_nopath"] + "/journal/CitationForm.php");
	}

	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = {
		citation_doi: [ ['meta[name="dc.identifier"]','content'] ],
		citation_journal_abbrev: [ ['div.contents.printArea tr a','innerText'] ],
		citation_abstract: [ ['div.abstract','innerText', true, 20000] ],
		citation_download: [ ['input[name="a_url"]', 'value'] ]
	};

	// finally expose selector message and link formatter
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink };

}());
