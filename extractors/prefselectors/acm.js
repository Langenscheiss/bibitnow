var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	// this function is called by the background script in order to return a properly formatted citation download link
	function formatCitationLink(metaData, link) {

		//get id and parent id from url (preferred) or doi (not always working!), and attach to link
		let idArr = metaData["citation_url"].replace(/^.*id=/,"").split(".")
		if (idArr == null || idArr.length < 2) idArr = metaData["citation_doi"].replace(/^[^\/]*\//,"").split(".");
		if (idArr == null || idArr.length < 2) return "";
		       
		//get CFID etc from link
		link = link.replace(/^.*CFID=/i,"");
		return ("https://dl.acm.org/downformats.cfm?id=" + idArr[1].trim() + "&parent_id=" + idArr[0].trim() + "&expformat=endnotes&CFID=" + link + "&include=abs");
	}
	
	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = { 
		citation_author: [ ['meta[name="citation_authors"]','content'] ],
		citation_misc: [ ['meta[name="citation_isbn"]','content'] ],
		citation_journal_title: [ ['meta[name="citation_journal_title"]','content'] ],
		citation_url: [ ['meta[name=citation_abstract_html_url]','content'] ],
		citation_abstract: [ ['div#abstract','innerText',true,20000] ],
		citation_download: [ ['form[name="qiksearch"]', 'action'] ]
	};

	// finally expose selector message and link formatter
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink };

}());
