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
		if (metaData["query_summary"]["citation_download"] == 1) {
			return (metaData["citation_url_nopath"] + link.replace(/citmgr\?/,"citmgr?type=mendeley&"));
		} else if (metaData["query_summary"]["citation_download"] == 2){
			return (metaData["citation_url_nopath"] + link.trim());
		}
	}

	function getFallbackURL(url) {
    return (url.search(/.*\.pdf[\s]*$/i) != -1) ?  url.replace(/\/content\/pnas\//i,"/content/").replace(/[\s]*\.[\s]*full[\s]*\.[\s]*pdf[\s]*$/i,"") : null;
  }

	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = {
		citation_publisher: [ ['meta[name="DC.Publisher"]','content'] ],
		citation_download: [ ['div#cb-art-mgr li a','href'] , ['ul.hw-citation-links li.mendeley a','href'] ],
		citation_abstract: [ ['div.section.abstract','innerText',true,20000] ],
		citation_keywords: [ ['ul.kwd-group li.kwd','innerText'] ]
	};

	// finally expose selector message and link formatter
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink , getFallbackURL: getFallbackURL };

}());
