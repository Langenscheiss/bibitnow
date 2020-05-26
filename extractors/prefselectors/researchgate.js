var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	// this function is called by the background script in order to return a properly formatted citation download link
	function formatCitationLink(metaData, link) {
		if (link == null || link == "") return "";
		let query = metaData["query_summary"]["citation_download"];
		if (query == 1) {
			
			return (metaData["citation_url_nopath"] + "/lite.publication.PublicationDownloadCitationModal.downloadCitation.html?fileType=RIS&citation=citationAndAbstract&publicationUid=" + link.replace(/^[\s]*PB:[\s]*/i,""));
		} else if (query == 2) {
			let uid = metaData["citation_url"].replace(/(?:^.*\/publication\/|\_.*$)/gi,"");
			if (uid == "" || uid.search(/[^0-9]/) != -1) return "";
			return (metaData["citation_url_nopath"] + "/literature.AjaxLiterature.downloadCitation.html?publicationUid=" + uid + "&fileType=RIS&citation=citationAndAbstract");
		}
		return "";
	}
	
	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = {
		citation_title: [ ['span.content-page-header__sticky-content-item-title','innerText'] ],
		citation_type: [ ['strong.publication-meta-type','innerText'] ],
		citation_misc: [ ['div.publication-meta-text-book div','innerText',true] , ['div.research-detail-meta li.nova-e-list__item','innerText'] ],
		citation_download: [ ['meta[property="rg:id"]','content'] , ['meta[property="og:type" i]','content'] ]
	};

	// finally expose selector message and link formatter
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink };

}());
