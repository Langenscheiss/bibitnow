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
		return (metaData["citation_url"].replace(/&.*$/,"").replace(/books\?id=/,"books/download?id=") + "&output=ris");
	}
	
	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = { 
		citation_author: [ ['div.bookinfo_sectionwrap div:nth-of-type(1) a','innerText'] ],
		citation_publisher: [ ['div.bookinfo_sectionwrap div:nth-of-type(2)','innerText'] ],
		citation_date: [ ['div.bookinfo_sectionwrap div:nth-of-type(2)','innerText'] ],
		citation_misc: [ ['table#metadata_content_table tr.metadata_row','innerText'] ],
		citation_title: [ ['td#bookinfo h1.booktitle','innerText'] ],
		citation_abstract: [ ['meta[name="description"]','content', true, 20000] ],
		citation_url: [ ['div[data-cbh="consent.google.com"]','data-continue'] ],
		citation_download: [ ['title','innerText'] ] //dummy
	};

	// finally expose selector message and link formatter
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink };

}());
