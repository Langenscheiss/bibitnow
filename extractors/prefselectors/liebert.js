var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;

	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = { 
		citation_volume: [ ['span.volume','innerText'] ],
		citation_issue: [ ['span.issue','innerText'] ],
		citation_firstpage: [ ['span.page-range','innerText'] ],
		citation_download: [ ['meta[scheme="doi" i]','content'] ],
		citation_publisher: [ ['meta[property="og:site_name" i]','content'] ],
		citation_keywords: [ ['meta[name="news_key_words"]','content'] ],
		citation_abstract: [ ['meta[name="citation_abstract"]','content', true, 20000] , ['meta[property="og:description"]','content', true, 20000] ],
	};
	
	// this function is called by the background script in order to return a properly formatted citation download link
	function formatCitationLink(metaData, link) {
		if (link == null || link == "") return "";
		metaData["citation_download_method"] = "POST";
		link = metaData["citation_url_nopath"] + "/action/downloadCitation?doi=" + link + "&include=abs&format=ris&submit=Download+article+citation+data";
		return link;
	}
	
	// expose selector message and link formatter
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink };

}());
