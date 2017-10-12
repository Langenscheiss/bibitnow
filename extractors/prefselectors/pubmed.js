var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	// this function is called by the background script in order to return a properly formatted citation download link
	function formatCitationLink(metaData, link) {
		
		//get base url
		var returnString = metaData["citation_url"].replace(/\.gov\/.*$/,".gov/pubmed/");
		
		//modify
		returnString += link;
		returnString += "?report=xml&format=text"
		return returnString;
	}
	
	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = { 
		citation_author: [ ['div.auths a','innerText'] ],
		citation_title: [ ['div.rprt_all div.rprt.abstract h1','innerText'] ],
		citation_journal_title: [ ['div.rprt_all div.rprt.abstract div.cit a','title'] ],
		citation_doi: [ ['div.resc a[ref="aid_type=doi"]','innerText'] ],
		citation_publisher: [ ['p.copyright','innerText'] , ['div.linkoutlist a[title="Full text at publisher\'s site"]','innerText'] ],
		citation_misc: [ ['meta[name="description"]','content'] ],
		citation_download: [ ['meta[name="ncbi_uidlist"]','content'] ]
	};

	// finally expose selector message
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink };

}());
