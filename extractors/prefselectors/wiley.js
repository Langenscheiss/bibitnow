var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	// this function is called by the background script in order to return a properly formatted citation download link
	function formatCitationLink(metaData, link) {
		link = link.trim();
		if (link == null || link == "") return "";
		if (metaData["query_summary"]["citation_download"] == 1) {
			link = link.replace(/exportCitation/,"getCitation") + "?citation-type=reference";
			return (metaData["citation_url"].replace(/wiley\.com\/.*$/,"wiley.com") + link + "&download-citation-abstract=Citation+%26+Abstract");
		} else if (metaData["query_summary"]["citation_download"] == 2) {
			link = link.replace(/documentcitationdownload/,"documentcitationdownloadformsubmit").replace(/publicationDoi[^&]+&/,"").replace(/&type=.*$/,"&fileFormat=PLAIN_TEXT&hasAbstract=CITATION_AND_ABSTRACT");
			metaData["citation_download_method"] = "POST";
		}  
		if (link == "") return "";
		return (metaData["citation_url"].replace(/wiley\.com\/.*$/,"wiley.com") + link);		
	}
	
	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = { 
		citation_author: [ ['meta[name="citation_authors"]','content'] ],
		citation_firstpage: [ ['meta[name="citation_firstpage"]','content'] , ['p.issue-header__description span:last-child','innerText'] ],
		citation_misc: [ ['meta[name="citation_book_title"]','content'] , ['section#abstract span.mjx-math, section#abstract span.MJX_Assistive_MathML','innerText',true, 1024, true, 1000] ],
		citation_publisher: [ ['footer#copyright','innerText'] , ['p#copyright','innerText'] ],
		citation_download: [ ['a.analytics-view-citation','href'] , ['li.citation a','href' ] ],
		citation_abstract: [ ['section#abstract','innerText',true,20000] , ['div#abstract','innerText',true,20000] ]
	};

	// finally expose selector message
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink };

}());
